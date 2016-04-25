var React = require('react');
var ReactDOM = require('react-dom');
var EventPage = require('./components/EventPage.jsx');
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
    var id = window.location.pathname.replace("/events/", "");
    var thisEvent;
    events.map(function(event) {
        event.date = new Date(event.date);
        if (event._id === id) {
            thisEvent = event;
        }
    })
    ReactDOM.render(<EventPage
        info = { thisEvent }
        login = { login }
        />, document.getElementById('container'));
}

// initial rendering
render();
