const express = require("express")
const app =express()
const https = require("https")
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:true}))
let userCity =''

app.post("/", function(req,res){
    let userCity = req.body.City;
        const url = "https://api.openweathermap.org/data/2.5/weather?q="+ userCity + "&APPID=fa92de4ba5e5e04103e2d72de443321f#&units=metric";
    https.get(url, function(response){
        console.log(response.statusCode)
        response.on("data", function(data){
            const weather = JSON.parse(data)
            const icon ="http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png"
            const temp = weather.main.temp
            const weatherDescription = weather.weather[0].description
            res.write("<h1>" +"The weather in " + userCity + " is " + weatherDescription + "</h1>")
            res.write("<h1>" +"The temperature in " + userCity + " is " + temp + "</h1>")
            res.write("<img src =" +icon+"></img>")
            res.send()
        })
    })
})

app.get("/", function(req,res){
    
    res.sendFile(__dirname + "/index.html")

})

app.listen(3000, function(){
    console.log("server started")
})