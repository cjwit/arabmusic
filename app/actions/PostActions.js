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

    addComment: function(comment) {
        console.log('dispatching addComment');
        dispatcher.dispatch({
            object: comment,
            type: 'post:addComment'
        });
    }
}
