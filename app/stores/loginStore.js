var dispatcher = require('../dispatcher.js');
var loginService = require('../services/loginService.js');

var LoginStore = function() {
    var listeners = [];
    var user = null;

    var getUsers = function(cb) {
        loginService.getUsers().then(function (res) {
            cb(res);
        })
    }

    var getUser = function() {
        console.log('Fetching your info... from loginStore ');
        FB.api('/me', function(response) {
            // response object is name and ID.. this could be how to connect to the database
            console.log(response);
            return response;
        });

/*
        if (userID === null) {
            return null;
        }
        loginService.getUser(userID).then(function (res) {
            console.log(res);
            return res
        })
*/
    }

    var onChange = function(listener) {
        getUsers(listener);
        listeners.push(listener);
    }

    var addUser = function(user) {
        loginService.addUser(user).then(function (res) {
            console.log(res);
            triggerListeners();
        })
    }

    var triggerListeners = function() {
        getUser(function (res) {
            listeners.forEach(function(listener) {
                listener(res);
            });
        });
    }

    dispatcher.register(function (payload) {
        var split = payload.type.split(':');
        if (split[0] === 'event') {
            switch (split[1]) {
                case "getUser":
                    getUser(payload.object);
                    break;
                case "addUser":
                    addUser(payload.object);
                    break;
            }
        }
    });

    // create the object for export
    return {
        onChange: onChange,
        getUser: getUser
    }
}

module.exports = LoginStore();
