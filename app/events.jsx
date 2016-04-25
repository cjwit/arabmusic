var React = require('react');
var ReactDOM = require('react-dom');
var Events = require('./components/Events.jsx');
var eventsStore = require('./stores/eventsStore');
var Dummy = require('./dummycontent.js');

// Get content from database
var events = [];
var getEventsCallback = function(_events) {
    events = _events;
    render();
}

eventsStore.onChange(getEventsCallback);

var login = Dummy.login;

function render() {
    // give events Date objects
    events.map(function(event) {
        event.date = new Date(event.date);
    })
    ReactDOM.render(<Events
        events = { events }
        login = { login }
        />, document.getElementById('container'));
}

// initial rendering
render();
