var dispatcher = require('../dispatcher');

module.exports = {
    // called from the EventForm
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

    editEvent: function(event) {
        dispatcher.dispatch({
            object: event,
            type: "event:editEvent"
        });
    }
}
