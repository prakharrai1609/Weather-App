const express = require('express');
const https = require('https');

const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.post('/', (req, res) => {
    const city = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=49e5e31e4ead1b6cbd869a3463d020ed&units=metric";

    https.get(url, (response) => {

        response.on('data', (data) => {
            const weatherBox = JSON.parse(data);
            // console.log(weatherBox)
            const temp = weatherBox.main.temp;
            const description = weatherBox.weather[0].description;
            const icon = weatherBox.weather[0].icon;

            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write('<h1>The temprature in ' + city + ' is ' + temp + ' degree celcius </h1>');
            res.write('<h2>It looks like ' + description + '</h2>');
            res.write('<img src="' + imageUrl + '">')
        })

    })


})

app.listen(3000, () => {
    console.log("Server is listening...");
})