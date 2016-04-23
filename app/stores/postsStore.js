var dispatcher = require('../dispatcher.js');
var Dummy = require('../dummycontent.js');

var PostStore = function() {
    var listeners = [];
    var posts = Dummy.discussions;

    var getPosts = function() {
        return posts;
    }

    var onChange = function(listener) {
        listeners.push(listener);
    }

    var addPost = function(post) {
        posts.push(post);
        triggerListeners();
    }

    var deletePost = function(post) {
        var _index;
        var postID = post.author + post.date.getTime();
        posts.map(function(p, index) {
            var pID = p.author + p.date.getTime();
            if (pID === postID) {
                _index = index;
            }
        });
        posts.splice(_index, 1);
        triggerListeners();
    }

    // object: { discussionID, commentInfo }
    var addComment = function(commentObject) {
        var discussionID = commentObject.discussionID;
        var comment = commentObject.comment;
        posts.forEach(function(post) {
            var id = post.author + post.date.getTime()
            if (discussionID === id) {
                post.comments.push(comment);
            }
        })
        triggerListeners();
    }

    var triggerListeners = function() {
        listeners.forEach(function(listener) {
            listener(posts);
        })
    }

    dispatcher.register(function (payload) {
        var split = payload.type.split(':');
        if (split[0] === 'post') {
            switch (split[1]) {
                case "addPost":
                    addPost(payload.object);
                    break;
                case "deletePost":
                    deletePost(payload.object);
                    break;
                case "addComment":
                    addComment(payload.object);
                    break;
            }
        }
    });

    // create the object for export
    return {
        getPosts: getPosts,
        onChange: onChange
    }
}

module.exports = PostStore();
