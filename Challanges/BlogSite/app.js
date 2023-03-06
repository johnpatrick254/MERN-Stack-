const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const ejs = require("ejs")
const _ = require("lodash")
const mongoose = require('mongoose')
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static("public"))
app.set("view engine", "ejs")

//connect to Mongo atlas
mongoose.set("strictQuery",true)
mongoose.connect("mongodb+srv://jpattrick538:Koffiking1@cluster0.rfaz43j.mongodb.net/blogsiteDB")
//end of db connection

//schemas
const blogSchema = new mongoose.Schema({
    title: String,
    postContent: String
})
//end of schemas

//models
const Post = new mongoose.model("post",blogSchema)
//end of models


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


app.get("/", function (req, res) {
 Post.find({}).then((foundResult) => {
    if(foundResult.length === 0){
        const defaultPost = new Post({
            title:"First Blog",
            postContent:homeStartingContent
        }
        )
        defaultPost.save()
        console.log("Added default post to homepage");
        res.redirect("/")
    }
    
    console.log(foundResult)
    res.render("home", {
        posts: foundResult
    })

}
    )

   
    

})

app.get("/contact", function (req, res) {
    res.render("contact", {
        contactContent: contactContent
    })
})

app.get("/about", function (req, res) {
    res.render("about", {
        aboutContent: aboutContent
    })
})
app.get("/compose", function (req, res) {
    res.render("compose")
})
app.get("/posts/:postName", function (req, res) {
    let param = req.params
    let custRoute = _.lowerCase(param.postName)
  
    Post.find({}).then((foundPost)=> {
        foundPost.forEach(function(post){
            if(_.lowerCase(post.title) === custRoute){
                res.render("post", {
                    postHeading: post.title,
                    postBody: post.postContent
                })
            }else{
                console.log(post.title);
            }
        })
    }) 



    
})

app.post("/compose", function (req, res) {
    const post = new  Post({
        title: req.body.postTitle,
        postContent: req.body.newPost
    })
    post.save()
    res.redirect("/")
})
app.listen(3000, function () {
    console.log("Server started on Port 3000");
})

