var React = require('react');
var ReactDOM = require('react-dom');
var DiscussionPage = require('./components/DiscussionPage.jsx');
var postsStore = require('./stores/postsStore');
var Dummy = require('./dummycontent.js');

// Get content from stores

var discussions = postsStore.getPosts();
postsStore.onChange(function(_discussions) {
    discussions = _discussions;
    render();
})

console.log('path: ', window.location.pathname)

var login = Dummy.login;

function render() {
    ReactDOM.render(<DiscussionPage
        info = { discussions[0] }
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
