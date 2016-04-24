var React = require('react');
var ReactDOM = require('react-dom');
var DiscussionsMain = require('./components/DiscussionsMain.jsx');
var eventsStore = require('./stores/eventsStore');
var pageStore = require('./stores/pageStore');
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

var target = pageStore.getTarget();
pageStore.onChange(function(_target) {
    target = _target;
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
    ReactDOM.render(<DiscussionsMain
        discussions = { discussions }
        login = { login }
        />, document.getElementById('container'));
}

// initial rendering
render();

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
