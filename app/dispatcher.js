var Guid = require('guid');

var listeners = {};

// called by Actions
// payload is an object containing
//      the object to be acted on and
//      a string that helps the register determine what to do with it
var dispatch = function(payload) {
    for (var id in listeners) {
        listeners[id](payload);
    }
}

// called by Stores
// callback determines the proper action to take and
//      runs a function (add, delete, etc) from the Stores
var register = function(callback) {
    var id = Guid.create();
    listeners[id] = callback;
}

module.exports = {
    register: register,
    dispatch: dispatch
}
