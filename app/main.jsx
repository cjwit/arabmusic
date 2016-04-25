var React = require('react');
var ReactDOM = require('react-dom');
var Home = require('./components/Home.jsx');
var eventsStore = require('./stores/eventsStore');
var postsStore = require('./stores/postsStore');
var Dummy = require('./dummycontent.js');

// Get content from database
var events = [];
var getEventsCallback = function(_events) {
    events = _events;
    render();
}
eventsStore.onChange(getEventsCallback);

// still using dummy content
var discussions = postsStore.getPosts();
postsStore.onChange(function(_discussions) {
    discussions = _discussions;
    render();
})

var login = Dummy.login;

function render() {
    // give events Date objects
    events.map(function(event) {
        event.date = new Date(event.date);
    })
    
    ReactDOM.render(<Home
        events = { events }
        discussions = { discussions }
        login = { login }
        />, document.getElementById('container'));
}

// initial rendering
render();
