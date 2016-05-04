var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var compress = require('compression');

// controllers
var eventController = require('./controllers/eventController');
var postController = require('./controllers/postController');
var resourceController = require('./controllers/resourceController');
var noticeController = require('./controllers/noticeController');

// requests
var app = express();
app.use(compress())
app.use(express.static(path.join(__dirname, "../app/dist")));
app.use(bodyParser.json());
app.use("/api/events", eventController);
app.use("/api/posts", postController);
app.use("/api/resources", resourceController);
app.use("/api/notices", noticeController);

// page routing
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../app/dist/index.html'));
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
