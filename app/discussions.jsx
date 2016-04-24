var React = require('react');
var ReactDOM = require('react-dom');
var DiscussionsMain = require('./components/DiscussionsMain.jsx');
var postsStore = require('./stores/postsStore');
var Dummy = require('./dummycontent.js');

// Get content from stores

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
