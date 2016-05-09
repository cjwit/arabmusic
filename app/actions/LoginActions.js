var dispatcher = require('../dispatcher');

module.exports = {
    // called from the EventForm
    getUser: function(user) {
        dispatcher.dispatch({
            object: user,
            type: "login:getUser"
        });
    },

    addUser: function(user) {
        dispatcher.dispatch({
            object: user,
            type: "login:addUser"
        });
    }
}
