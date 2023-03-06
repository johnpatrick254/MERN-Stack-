const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(express.static("public"));
app.set("view engine", "ejs");

//mongoose DB connection
mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");

//db schemas
const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
});

//db models
const articles = mongoose.model("article", articleSchema);

//routes

//home route
app
    .route("/articles")
    .get(function (req, res) {
        articles
            .find()
            .then((article) => {
                res.send(article);
            })
            .catch((err) => {
                console.log(err);
            });
    })
    .post(function (req, res) {
        const newTitle = req.body.title;
        const newContent = req.body.content;
        const newArticle = new articles({
            title: newTitle,
            content: newContent,
        });
        newArticle
            .save()
            .then((saved) => {
                console.log("successfully added new article", saved.title);
            })
            .catch((err) => {
                console.log(err);
            });
        res.redirect("/articles");
    })
    .delete(function (req, res) {
        articles
            .deleteMany()
            .then(console.log("deleted all articles successfully"));
        res.redirect("/articles");
    });

//custom route
app
    .route("/articles/:article")
    .get(function (req, res) {
        const articleName = req.params.article;
        articles
            .findOne({
                title: articleName,
            })
            .then((article) => {
                if (!article) {
                    console.log("Article does not exist");
                    res.send("article does not exist! ");
                } else {
                    res.send(article);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    })
    .put(function (req, res) {
        articles
            .findOneAndUpdate({
                title: req.params.article,
            }, {
                title: req.body.title,
                content: req.body.content,
            }, {
                new: true,
            })
            .then((updated) => {
                console.log("successfully updated ", updated.title);
                res.redirect("/articles/" + req.body.title);
            });
    })
    .patch(function (req, res) {
        articles
            .findOneAndUpdate({
                title: req.params.article,
            }, {
                $set: req.body,
            },{
                new: true,
            })
            .then((updated) => {
                console.log("successfully updated ", updated.title);
                res.redirect("/articles/" + updated.title);
            });
    })
    .delete(function (req, res) {
        articles
            .deleteOne({
                title: req.params.article,
            })
            .then((deleted) => {
                console.log("successfully deleted ", req.params.article);
                res.send("successfully deleted " + req.params.article);
            });
    });
//port setup
app.listen(3000, function () {
    console.log("Server started on port 3000");
});