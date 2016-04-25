var React = require('react');
var ReactDOM = require('react-dom');
var DiscussionPage = require('./components/DiscussionPage.jsx');
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
    // give events Date objects
    var id = window.location.pathname.replace("/discussions/", "");
    var thisPost;
    discussions.map(function(post) {
        if (post._id === id) {
            thisPost = post;
        }
    })
    thisPost.date = new Date(thisPost.date);

    ReactDOM.render(<DiscussionPage
        info = { thisPost }
        login = { login }
        />, document.getElementById('container'));
}

// initial rendering
render();
