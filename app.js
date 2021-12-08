const express = require('express')
const { stat } = require('fs')
const https = require('https')
const bodyParser = require('body-parser')

const app = express()

//tells app to use bodyparser with extended paramerter
app.use(bodyParser.urlencoded({extended: true}));

//  arrow function, remove function word replace w/     () =>
app.get('/', function (req, res) {

    res.sendFile(__dirname + '/index.html')


})

app.post('/', function(req, res) {

    const appID = '7221451f76e497e82bd0cd195e294e0c'
    const query = req.body.cityName
    const units = 'imperial'
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + appID + '&units=' + units
    https.get(url, (response) => {
        console.log(response.statusCode)

        //getting the data and parse it as a js object
        response.on('data', function (data) {
            weatherData = JSON.parse(data)
            console.log(weatherData);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description
            console.log(temp);
            console.log(desc);
            //this is the res from .get not to be confused
            //with the response from the .on class
            res.write('<h1> Current Weather conditions: ' + desc + "</h1>")
            res.write('<h1>The temperature in ' + query + ' is ' + temp + 'F </h1>')
            //write then send data
            const icon =  weatherData.weather[0].icon + '@2x.png'
            res.write('<img src="http://openweathermap.org/img/wn/'+ icon  + '">')
            res.send()

        })

     })


})



app.listen(3000,  () => {
    console.log('listening on port 3000');

})