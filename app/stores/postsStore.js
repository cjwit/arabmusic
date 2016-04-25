var dispatcher = require('../dispatcher.js');
var postService = require('../services/postService.js');

var PostStore = function() {
    var listeners = [];

    var getPosts = function(cb) {
        postService.getPosts().then(function (res) {
            cb(res);
        });
    }

    var onChange = function(listener) {
        getPosts(listener);
        listeners.push(listener);
    }

    var addPost = function(post) {
        postService.addPost(post).then(function (res) {
            console.log(res);
            triggerListeners();
        });
    }

    var deletePost = function(post) {
        postService.deletePost(post).then(function(res) {
            console.log(res);
            triggerListeners();
        });
    }

    // object: { discussionID, commentInfo }
    // STILL TO FIX
    var addComment = function(commentObject) {
        postService.addComment(commentObject).then(function(res) {
            console.log(res);
            triggerListeners();
        });
    }

    var triggerListeners = function() {
        getPosts(function (res) {
            listeners.forEach(function(listener) {
                listener(res);
            });
        });
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
        onChange: onChange
    }
}

module.exports = PostStore();
