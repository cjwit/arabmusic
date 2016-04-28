var dispatcher = require('../dispatcher');

module.exports = {
    // called from the PostForm
    addPost: function(post) {
        dispatcher.dispatch({
            object: post,
            type: "post:addPost"
        });
    },

    deletePost: function(post) {
        dispatcher.dispatch({
            object: post,
            type: "post:deletePost"
        });
    },

    editPost: function(post) {
        dispatcher.dispatch({
            object: post,
            type: "post:editPost"
        });
    },

    addComment: function(comment) {
        dispatcher.dispatch({
            object: comment,
            type: 'post:addComment'
        });
    },

    deleteComment: function(comment) {
        dispatcher.dispatch({
            object: comment,
            type: "post:deleteComment"
        });
    }
}
