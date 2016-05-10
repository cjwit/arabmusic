var dispatcher = require('../dispatcher');

module.exports = {
    addUser: function(user) {
        dispatcher.dispatch({
            object: user,
            type: "user:addUser"
        });
    },

    editUser: function(user) {
        dispatcher.dispatch({
            object: user,
            type: "user:editUser"
        });
    },

    deleteUser: function(user) {
        dispatcher.dispatch({
            object: user,
            type: "user:deleteUser"
        });
    }
}
