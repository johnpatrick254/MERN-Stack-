//require mongoose
const mongoose = require("mongoose");

//connect Client
mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/cars", {
  useNewUrlParser: true,
});

// create a schema and validation for entries as objects
const carOwnerSchema = new mongoose.Schema({
  _id: Number,
  name: "String",
  age:Number
})

const carsSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: [true,"don't forget id is a must my friend"]
  },
  name: String,
  Brand: String,
  Model: String,
  Rating: {
    type: Number,
    min: 1,
    max: [5,'wacha kiherehere na u rate adi 5']
  },
  //Insert schema to referencing collection you want to embed
  owner:carOwnerSchema
});

// create Collection model

const cars = mongoose.model("car", carsSchema);

const Owner = mongoose.model("owner", carOwnerSchema)

//insert new items inside collection model
const john = new Owner({
  _id:1,
  name:"John",
  age:25
})
john.save();

const gle = new cars({
  _id: 104,
  Brand: "Mercedes",
  Model: " Gle 63s",
  Rating: 5,
  owner:john
});
gle.save();




//update data in collection
// cars.updateOne({_id:41},{name:"Clown"}, function(err){
//   if(err){
//     console.log(err)
//   }else{
//     console.log("Success")
//   }
// mongoose.connection.close()
// })