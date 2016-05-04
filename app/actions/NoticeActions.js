var dispatcher = require('../dispatcher');

module.exports = {
    // called from the PostForm
    addNotice: function(notice) {
        dispatcher.dispatch({
            object: notice,
            type: "notice:addNotice"
        });
    },

    deleteNotice: function(notice) {
        dispatcher.dispatch({
            object: notice,
            type: "notice:deleteNotice"
        });
    },

    editNotice: function(notice) {
        dispatcher.dispatch({
            object: notice,
            type: "notice:editNotice"
        });
    }
}
