var React = require('react');
var ReactDOM = require('react-dom');
var Page = require('./components/Page.jsx');
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
    renderPage();
})

var target = pageStore.getTarget();
pageStore.onChange(function(_target) {
    target = _target;
    renderPage();
})

var discussions = postsStore.getPosts();
postsStore.onChange(function(_discussions) {
    discussions = _discussions;

    // works here
    discussions.forEach(function(post) {
        post.comments.forEach(function(comment) {
            if (comment.author === "Tester's Big Brother") {
                console.log('from main', comment);
            }
        })
    })

    renderPage();
})

var login = true;

function renderPage() {
    // works here
    discussions.forEach(function(post) {
        post.comments.forEach(function(comment) {
            if (comment.author === "Tester's Big Brother") {
                console.log('from renderPage() on main', comment);
            }
        })
    })

    // render, send target
    ReactDOM.render(<Page events = { events }
                          discussions = { discussions }
                          login = { login }
                          target = { target }
                          />, document.getElementById('container'));
}

// initial rendering
renderPage();

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
