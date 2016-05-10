var dispatcher = require('../dispatcher');

module.exports = {
    // called from the EventForm
    login: function(loginObject) {
        dispatcher.dispatch({
            object: loginObject,
            type: "login:login"
        });
    },

    logout: function() {
        dispatcher.dispatch({
            object: null,
            type: "login:logout"
        });
    }
}
