var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// controllers
var eventController = require('./controllers/eventController');
var postController = require('./controllers/postController');
var resourceController = require('./controllers/resourceController');

// requests
var app = express();
app.use(express.static(path.join(__dirname, "../app/dist")));
app.use(bodyParser.json());
app.use("/api/events", eventController);
app.use("/api/posts", postController);
app.use("/api/resources", resourceController);

// page routing
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../app/dist/index.html'));
})

app.get('/discussions/', function(req, res) {
    res.sendFile(path.join(__dirname, '../app/dist/discussions.html'));
})

app.get('/discussions/:id', function(req, res) {
    res.sendFile(path.join(__dirname, '../app/dist/discussionPage.html')); // render?
})

app.get('/events/', function(req, res) {
    res.sendFile(path.join(__dirname, '../app/dist/events.html'));
})

app.get('/events/:id', function(req, res) {
    res.sendFile(path.join(__dirname, '../app/dist/eventPage.html')); // render?
})

app.get('/resources/', function(req, res) {
    res.sendFile(path.join(__dirname, '../app/dist/resources.html'));
})

app.get('/resources/:id', function(req, res) {
    res.sendFile(path.join(__dirname, '../app/dist/resourcePage.html')); // render?
})

// listen
var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log("Listening on port ", port, "...");
});

// connect to database
var dblogin = process.env.DBLOGIN;
var dbpassword = process.env.DBPASSWORD;

var dburl = 'mongodb://<dbuser>:<dbpassword>@ds019481.mlab.com:19481/arabmusictest'
    .replace("<dbuser>", dblogin)
    .replace('<dbpassword>', dbpassword);
mongoose.connect(dburl)
