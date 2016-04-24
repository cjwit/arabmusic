var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "../app/dist")));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../app/dist/index.html'));
})

app.get('/discussions', function(req, res) {
    res.sendFile(path.join(__dirname, '../app/dist/discussions.html'));
})

app.get('/events', function(req, res) {
    res.sendFile(path.join(__dirname, '../app/dist/events.html'));
})

app.listen(port, function() {
    console.log("Listening on port ", port, "...");
});
