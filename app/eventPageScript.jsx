var React = require('react');
var ReactDOM = require('react-dom');
var EventPage = require('./components/EventPage.jsx');
var eventsStore = require('./stores/eventsStore');
var Dummy = require('./dummycontent.js');

// Get content from stores
var events = eventsStore.getEvents().sort(function(a, b) {
    return a.date - b.date;
});

eventsStore.onChange(function(_events) {
    events = _events;
    render();
})

var login = Dummy.login;

function render() {
    ReactDOM.render(<EventPage
        info = { events[0] }
        login = { login }
        />, document.getElementById('container'));
}

// initial rendering
render();
