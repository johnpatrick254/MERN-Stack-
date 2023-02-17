const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const logic = require("logic.js")
app.use(bodyParser.urlencoded({
  extended: true
}))
app.set("view engine", 'ejs')

app.use(express.static("public"))

var items = []
var workList = []

app.get("/", function (req, res) {
  let today = logic.day()
  console.log(today);
  var currentDay = logic.date()
  console.log(currentDay);
  if (currentDay === 6 || currentDay === 0) {
    res.render("list", {
      listTitle: today,
      newItem: items
    })
  } else {
    res.render("list", {
      listTitle: today,
      newItem: items
    })
  }

})
app.post("/", function (req, res) {
  var input = req.body.new_item;
  if (req.body.button === "Work") {
    workList.push(input)
    res.redirect('/work')
  } else {
    items.push(input)
    res.redirect('/')
  }
})

app.get("/work", function (req, res) {
  res.render('list', {
    listTitle: "Work List",
    newItem: workList
  })

})
app.get("/about", function (req, res) {
  res.render('about')

})
app.listen(3000, function () {
  console.log("Server started on Port 3000");
})