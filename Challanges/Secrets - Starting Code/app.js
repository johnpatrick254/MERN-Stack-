require("dotenv").config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const ejs = require("ejs")
const mongoose = require("mongoose")
const encrypt = require("mongoose-encryption")

//db connection

mongoose.set("strictQuery", true)
mongoose.connect("mongodb://127.0.0.1:27017/usersDB")
// end of db connection

//schemas

const userSchema = new mongoose.Schema({
    email:String,
    password:String 
})

//schema encryption
userSchema.plugin(encrypt,{secret:process.env.SECRET, encryptedFields:['password']})

//models
const newUser = mongoose.model("user",userSchema)

app.use(express.static("public"))
app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:true}))

//home routes
app.route("/home")
.get(function(req,res){
    res.render('home')
})
//login routes
app.route("/login")
.get(function(req,res){
    res.render('login')
}).post(function(req,res){
    newUser.findOne({email:req.body.username}).then((user)=> {
        if(user.password === req.body.password){
            res.render('secrets')
        }else if(!user === req.body.password){
            console.log("Wrong User or password")
            res.render('login')
        }
    }).catch((err)=>{if(err){
        console.log(err)
    }})
})
//register routes
app.route("/register")
.get(function(req,res){
    res.render('register')
}).post(function(req,res){
    const User = new newUser(
        {
            email:req.body.username,
            password:req.body.password
        }
    )
    User.save();
    console.log("added new user");
    res.redirect("/login")
})
//home routes
app.route("/secrets")
.get(function(req,res){
    res.render('secrets')
})
//home routes
app.route("/submit")
.get(function(req,res){
    res.render('submit')
})


//port

app.listen(3000, function(){
    console.log("Server started on port 3000");
})



