//require mongoose
const mongoose = require('mongoose');


//connect Client
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB",  {
  useNewUrlParser: true,
})

//create Schema
const peopleSchema = new mongoose.Schema(
  {
    _id: Number,
    name: String,
    age: Number
  }
)

//create collection model and specify schema
const person = mongoose.model("person", peopleSchema)

//insert  data into collection using model
const Peter = new person({
  name: "Peter",
  age:20
})
const James = new person({
  name: "James",
  age:23
})
const Abel =new person({
  name: "Abel",
  age:22
})

//use find method on collection model to find all objects inside collection
let personNames =[];
 person.find(function(err,persons){
  if(err){
    console.log(err);
  }else {
    
    persons.forEach(function(element){
      console.log(element.name);
    });
    mongoose.connection.close()
  }

})

