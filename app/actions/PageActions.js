var dispatcher = require('../dispatcher');

module.exports = {
    // called from the EventForm
    changePage: function(target) {
        dispatcher.dispatch({
            object: target,
            type: "page:changePage"
        });
    },

    // receiving correct object from Discussions
    openDiscussion: function(discussionObject) {
        dispatcher.dispatch({
            object: discussionObject,
            type: 'page:openDiscussion'
        })
    }
}
