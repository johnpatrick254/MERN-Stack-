require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");


app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
//express session and passport setup
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());


//db connection
mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/usersDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
// end of db connection

//schemas
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    googleId: String,
    facebookId: String,
    secret: String
});
const secretSchema = new mongoose.Schema({
    content: String
})

//schema passport encryption
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

//models
const newUser = mongoose.model("user", userSchema);

//passport strategy and serialization
passport.use(newUser.createStrategy());
passport.serializeUser(function (user, done) {
    done(null, user._id);

});

passport.deserializeUser(function (_id, done) {
    newUser.findById(_id, function (err, user) {
        done(err, user);
    });
});;

passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.SECRET,
        callbackURL: "http://localhost:3000/auth/google/secrets"
    },
    function (accessToken, refreshToken, profile, cb) {
        newUser.findOrCreate({
            googleId: profile.id
        }, function (err, user) {
            console.log(profile);
            return cb(err, user);
        });
    }
))

passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/secrets"
    },
    function (accessToken, refreshToken, profile, cb) {
        newUser.findOrCreate({
            facebookId: profile.id
        }, function (err, user) {
            return cb(err, user);
        });
    }
))

//home routes
app.route("/home").get(function (req, res) {
    res.render("home");
});
//login routes
app
    .route("/login")
    .get(function (req, res) {
        res.render("login");
    })
    .post(function (req, res) {
        const user = new newUser({
            username: req.body.username,
            password: req.body.password,
        });

        req.login(user, function (err) {
            if (!err) {
                passport.authenticate("local")(req, res, function () {
                    res.redirect("/secrets");
                });
            }
        });
    });
//register routes
app
    .route("/register")
    .get(function (req, res) {
        res.render("register");
    })
    .post(function (req, res) {
        newUser
            .register({
                    username: req.body.username,
                },
                req.body.password
            )
            .then((user) => {
                if (user) {
                    console.log("successfully added user");
                    res.redirect("/login");
                }
            })
            .catch((err) => {
                if (err) {
                    console.log(err);
                    res.redirect("/login");
                }
            });
    });

//submit routes
app.route("/submit").get(function (req, res) {
    if (req.isAuthenticated() === true) {
        res.render("submit");
        console.log(req.isAuthenticated());
    } else {
        console.log(req.isAuthenticated());
        console.log("wrong username or password");
        res.redirect("/login");
    }
}).post(function (req, res) {
    newUser.findById(req.user.id).then((user) => {
        user.secret = req.body.secret
        user.save();
        console.log("added new secret");
        res.redirect("/secrets")
    })
});
app.route("/logout").get(function (req, res) {
    req.logout(function (err) {
        if (!err) {
            console.log("logged out successfully");
        }
    });
    res.redirect("/home");
});
//google auth
app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile']
    }));

app.get('/auth/google/secrets',
    passport.authenticate('google', {
        failureRedirect: '/login'
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/secrets');
    }
)

//facebook routes
app.get('/auth/facebook',
    passport.authenticate('facebook'));

app.get('/auth/facebook/secrets',
    passport.authenticate('facebook', {
        failureRedirect: '/login'
    }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/secrets');
    });
//secret routes
app.route("/secrets").get(function (req, res) {

    newUser.find({
        "secret": {
            $ne: null
        }
    }).then((secret) => {
        console.log("this are the list", secret);
        res.render("secrets", {
            userSecrets: secret
        });
    })

});

//port

app.listen(3000, function () {
    console.log("Server started on port 3000");
});