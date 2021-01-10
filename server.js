// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
const cors = require('cors');

/* Middleware*/
// Configure express to use body-parser as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, () => { console.log(`running on localhost: ${port}`) })


// Callback function to complete GET '/all'
app.get('/all', function (req, res) {
    res.send(projectData)
})

// Post Route
app.post('/add', function (req, res) {
    projectData = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content
    }
    res.send(projectData)
    console.log(projectData)
})
