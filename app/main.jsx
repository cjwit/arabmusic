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
    console.log('from pageStore.onChange in main, _target: ', _target, 'old target', target)
    target = _target;
    console.log('from pageStore.onChange in main, target page: ', target.page, 'target object', target.content)
    renderPage();
})

var discussions = postsStore.getPosts();
postsStore.onChange(function(_discussions) {
    discussions = _discussions;
    renderPage();
})

var login = true;

function renderPage() {
//    var active = document.getElementsByClassName('active') || null;
//    if (active.length > 0) target.page = active[0].id;
    console.log('from main renderPage, target page: ', target.page, 'target content ', target.content)
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
