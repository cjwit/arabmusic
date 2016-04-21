var React = require('react');
var ReactDOM = require('react-dom');
var Home = require('./components/Home.jsx');
var Events = require('./components/Events.jsx');
var eventsStore = require('./stores/eventsStore');
var Dummy = require('./dummycontent.js');

// Get content
var events = eventsStore.getEvents().sort(function(a, b) {
    return a.date - b.date;
});

var discussions = Dummy.discussions.sort(function(a, b) {
    return b.date - a.date;
});

var loggedIn = true;

// set render options
function renderHome() {
    ReactDOM.render(<Home
        events = {
                events.filter(function(event) {
                    return event.date > new Date(Date.now());
                }).splice(0, 5)
        }
        discussions = {
            discussions.splice(0,5)
        }
        login = { loggedIn }
    />, document.getElementById('container'));
}

function renderEvents() {
    ReactDOM.render(<Events events = { events } login = { loggedIn }/>, document.getElementById('container'));
}

// Navbar navigations: add links or prevent defaults later
$('#login').click(function(e) {
    e.preventDefault()
    loggedIn = !loggedIn;
    if (loggedIn) {
        $('#login').text('Logged In');
    } else {
        $('#login').text('Logged Out');
    }
})

$('.navbar-brand').click(function(e) {
    e.preventDefault()
    $('.navlink').removeClass('active');
    renderHome();
})

$('.navlink').click(function(e) {
    e.preventDefault()
    $('.navlink').removeClass('active');
    $(this).addClass('active');
    var target = e.target.id;
    if (target === 'events') return renderEvents();
});

// initial rendering
renderHome();
