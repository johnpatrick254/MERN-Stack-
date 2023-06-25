const express = require("express")
const request = require("request")
const app = express()
const https = require("https")
const bodyParser = require("body-parser")
const { json } = require("body-parser")
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html")
})
fetch("http://localhost:3000/oop/database/Database.php").then(res=> res.json()).then(data=>console.log(data))
app.post("/", function(req,res){
   console.log(req.body) 
   const firstName = req.body.firstName;
   const secondName = req.body.secondName;
   const email = req.body.email;
   
   const data = {
    members : [{
        email_address:email,
        status: "subscribed",
        merge_fields:{
            FNAME: firstName,
            LNAME: secondName
        }
    }]
}
   const JSONdata = JSON.stringify(data)
   const url = "https://us10.api.mailchimp.com/3.0/lists/db9af40b31/"
   const options = {
       method:"POST",
       auth: "john:6bf15303caa4149e9805ff08da5efc25-us10"
    }
   const request = https.request(url, options, function(response){
    if (response.statusCode == 200){
        res.sendFile(__dirname + "/success.html")
    } else{
        res.sendFile(__dirname + "/failure.html")
}
    response.on("data", function(data){
      
    })
   })
   request.write(JSONdata)
   request.end();
})


app.listen(process.env.PORT || 5050, function(req,res){
    console.log("Server Started");
})


// api key = 6bf15303caa4149e9805ff08da5efc25-us10
// audience id = db9af40b31