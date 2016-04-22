var React = require('react');
var ReactDOM = require('react-dom');
var Home = require('./components/Home.jsx');
var Events = require('./components/Events.jsx');
var eventsStore = require('./stores/eventsStore');
var Dummy = require('./dummycontent.js');

// Get content from stores
var events = eventsStore.getEvents().sort(function(a, b) {
    return a.date - b.date;
});

eventsStore.onChange(function(_events) {
    events = _events;
    renderPage();
})

// REPLACE: get content from dummy
var discussions = Dummy.discussions.sort(function(a, b) {
    return b.date - a.date;
});

var loggedIn = true;

// set render options
function renderHome() {
    ReactDOM.render(<Home
        events = { events }
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
        $('#login>a').text('Logged In');
    } else {
        $('#login>a').text('Logged Out');
    }
})

$('.navlink').click(function(e) {
    e.preventDefault()
    $('.navlink').removeClass('active');
    $(this).addClass('active');
    renderPage();
});

function renderPage() {
    var active = document.getElementsByClassName('active');
    var target = active[0].id;
    if (target === 'home') return renderHome();
    if (target === 'events') return renderEvents();
    console.log('page is not set up yet')
}
// initial rendering
renderHome();
