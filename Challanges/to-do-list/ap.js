const express = require("express")
const app = express()
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine", 'ejs')

app.use(express.static("public"))

var items = []


app.get("/", function(req,res){
   var options = { weekday: 'long', month: 'long', day: 'numeric' };
   var date = new Date()
 var today = date.toLocaleDateString("en-US", options)
 var currentDay = date.getDay()
 if(currentDay === 6 || currentDay === 0){
  res.render("list", {kindofDay:today, newItem:items})
  }else{
   res.render("list", {kindofDay:today , newItem:items
  })
 }

})
app.post("/", function(req,res){
   var input = req.body.new_item;
  items.push(input)
  res.redirect('/')
})
app.listen(3000, function(){
    console.log("Server started");
})