var React = require('react');
var ReactDOM = require('react-dom');
var DiscussionsMain = require('./components/DiscussionsMain.jsx');
var postsStore = require('./stores/postsStore');
var Dummy = require('./dummycontent.js');

// Get content from database
var discussions = [];
var getPostsCallback = function(_discussions) {
    discussions = _discussions;
    render();
}
postsStore.onChange(getPostsCallback);

var login = Dummy.login;

function render() {
    discussions.map(function(post) {
        post.date = new Date(post.date);
    })

    // render, send target
    ReactDOM.render(<DiscussionsMain
        discussions = { discussions }
        login = { login }
        />, document.getElementById('container'));
}

// initial rendering
render();
