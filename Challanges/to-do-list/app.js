const mongoose = require("mongoose")
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();
const ejs = require('ejs')
const _ = require('lodash')

//connect to database
mongoose.set("strictQuery", true)
mongoose.connect("mongodb+srv://jpattrick538:Koffiking1@cluster0.rfaz43j.mongodb.net/to_do_listDB")

//schemas

const itemSchema = mongoose.Schema({
  name: String
})

const listSchema = mongoose.Schema({
  name: String,
  items: [itemSchema]
})

//end of schemas

//collection models

const Item = mongoose.model("item", itemSchema)

const List = mongoose.model("list", listSchema)

//end of collection models

//database entries
const item_1 = new Item({
  name: " Welcome to your to-do-List"
})
const item_2 = new Item({
  name: "Hit the + button to add a new Item"
})
const item_3 = new Item({
  name: "<-- Hit this to delete an item"
})

const default_items = [item_1, item_2, item_3];
const day = date.getDate();



//end of database entries
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function (req, res) {

  Item.find({}, function (err, items) {
    if (items.length === 0) {
      Item.insertMany(default_items, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully added default items to the list ");
          res.redirect("/")
        }
      })
    } else {
      res.render("list", {
        listTitle: day,
        newListItems: items
      })
    }
  })


});

app.post("/", function (req, res) {
  const listVal = req.body.list
  const item = _.capitalize(req.body.newItem);
  const tasks = new Item({
    name: item
  })
  if (listVal === day) {
    tasks.save()

    res.redirect("/")
  } else {

    List.findOne({
      name: listVal
    }, function (err, task) {
      if (err) {
        console.log(err);
      } else {
        if (task) {
          console.log(task);
          task.items.push(tasks)
          task.save()
          console.log("Successfully added item task to", listVal, "list");
          res.redirect("/" + listVal)
        }
      }
    })



  }
});

app.post("/delete", function (req, res) {
  const pageTitle = req.body.identity;
  const itemID = req.body.checkbox;
  console.log(itemID, pageTitle, req.body);
  if (pageTitle === day) {
    Item.findByIdAndDelete(itemID, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully deleted with id:", itemID);
        res.redirect("/")
      }
    })
  } else {
    List.findOneAndUpdate({
      name: pageTitle
    }, {
      $pull: {
        items: {
          _id: itemID
        }
      }
    }, function (err, item) {
      if (!err) {
        console.log(item);
        res.redirect("/" + pageTitle)
      }
    })
  }



});


app.get("/:customRoute", function (req, res) {
    const routeName = _.capitalize(req.params.customRoute)

    List.findOne({
        name: routeName
      }, function (err, task) {
        if (!err) {
          if (!task) {
            //create new task
            const custom = new List({
              name: routeName,
              items: default_items
            })
            custom.save();
            console.log("added new custom list", routeName);
            res.redirect("/" + routeName)
          } else {
            //render found task
            if (task.items.length === 0) {
              task.items = default_items
              task.save(),
                res.redirect("/" + routeName)
              console.log("added new custom list", routeName);

            } else {
              res.render("list", {
                listTitle: task.name,
                newListItems: task.items
              })
              console.log("loaded list", routeName);
            }
          }
        }
      }

      //   })
    )



    //   console.log("Successfully added default items to the", routeName, "list" )
    //       res.redirect("/customRoute")
    //   }
    // console.log(lists)
    // ;
    //  



  }


)


app.listen(3000, function () {
  console.log("Server started on port 3000");
});