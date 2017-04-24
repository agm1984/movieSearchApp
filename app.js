var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');

// Set public assets directory and templating engine
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Main Route
app.get('/', function(req, res) {
  res.render('search');
});

// Results Route
app.get('/results', function(req, res) {
    // Grab value from search.ejs form input with name='search'
    var search = req.query.search;
    var url = "http://omdbapi.com/?s=" + search;

    // Make HTTP Request to OMDBAPI
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            // Convert HTTP Response into JSON Object
            var data = JSON.parse(body);
            res.render('results', { data: data });
        } else {
            res.send(error);
        }
    });
});

// Server Config
var config = {};
config.port = 3000;
config.host = 'localhost';

// Start Server
app.listen(config.port, config.host, function () {
    console.log("Server started on port: " + config.port);
});
