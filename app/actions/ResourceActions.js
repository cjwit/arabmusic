var dispatcher = require('../dispatcher');

module.exports = {
    // called from the PostForm
    addCollection: function(collection) {
        dispatcher.dispatch({
            object: collection,
            type: "resource:addCollection"
        });
    },

    deleteCollection: function(collection) {
        dispatcher.dispatch({
            object: collection,
            type: "resource:deleteCollection"
        });
    },

    editCollection: function(collection) {
        dispatcher.dispatch({
            object: collection,
            type: "resource:editCollection"
        });
    },

    addItem: function(item) {
        dispatcher.dispatch({
            object: item,
            type: 'resource:addItem'
        });
    },

    editItem: function(item) {
        console.log('resourceActions', item.item.edited)
        dispatcher.dispatch({
            object: item,
            type: "resource:editItem"
        });
    },

    deleteItem: function(item) {
        dispatcher.dispatch({
            object: item,
            type: "resource:deleteItem"
        });
    }
}
