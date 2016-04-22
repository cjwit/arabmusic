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
    }
}
