var dispatcher = require('../dispatcher.js');
var userService = require('../services/userService.js');

var UserStore = function() {
    var listeners = [];

    var getUsers = function(cb) {
        userService.getUsers().then(function (res) {
            cb(res);
        })
    }

    var onChange = function(listener) {
        getUsers(listener);
        listeners.push(listener);
    }

    var addUser = function(user) {
        userService.addUser(user).then(function (res) {
            console.log(res);
            triggerListeners();
        })
    }

    var editUser = function(user) {
        userService.editUser(user).then(function (res) {
            console.log(res);
            triggerListeners();
        })
    }

    var deleteUser = function(user) {
        userService.deleteUser(user).then(function(res) {
            console.log(res);
            triggerListeners();
        });
    }

    var triggerListeners = function() {
        getUsers(function (res) {
            listeners.forEach(function(listener) {
                listener(res);
            });
        });
    }

    dispatcher.register(function (payload) {
        var split = payload.type.split(':');
        if (split[0] === 'user') {
            switch (split[1]) {
                case "addUser":
                    addUser(payload.object);
                    break;
                case "deleteUser":
                    deleteUser(payload.object);
                    break;
                case "editUser":
                    editUser(payload.object);
                    break;
            }
        }
    });

    // create the object for export
    return {
        onChange: onChange
    }
}

module.exports = UserStore();
