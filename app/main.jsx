var React = require('react');
var ReactDOM = require('react-dom');
var Home = require('./components/Home.jsx');
var eventsStore = require('./stores/eventsStore');
var postsStore = require('./stores/postsStore');
var Dummy = require('./dummycontent.js');

// Get content from stores
var events = eventsStore.getEvents().sort(function(a, b) {
    return a.date - b.date;
});

eventsStore.onChange(function(_events) {
    events = _events;
    render();
})

var discussions = postsStore.getPosts();
postsStore.onChange(function(_discussions) {
    discussions = _discussions;
    render();
})

var login = Dummy.login;

function render() {
    // render, send target
    ReactDOM.render(<Home
        events = { events }
        discussions = { discussions }
        login = { login }
        />, document.getElementById('container'));
}

// initial rendering
render();
