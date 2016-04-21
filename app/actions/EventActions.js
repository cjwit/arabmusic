var dispatcher = require('../dispatcher');

module.exports = {
    addEvent: function(event) {
        dispatcher.dispatch({
            object: event,
            type: "event:addEvent"
        });
    },

    deleteEvent: function(event) {
        dispatcher.dispatch({
            object: event,
            type: "event:deleteEvent"
        });
    },

    updateEvent: function(event) {
        dispatcher.dispatch({
            object: event,
            type: "event:updateEvent"
        });
    }
}
