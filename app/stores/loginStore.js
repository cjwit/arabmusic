var dispatcher = require('../dispatcher.js');
var loginService = require('../services/loginService.js');

var LoginStore = function() {
    var listeners = [];             // collection of functions
    var currentUser = {
        status: false,
        user: null
    }

    var getUser = function(cb) {
        console.log('getUser', currentUser);
        cb(currentUser);
    }

    var onChange = function(listener) {
        getUser(listener);
        listeners.push(listener);
    }

    var login = function(loginObject) {
        loginService.login(loginObject).then(function (res) {
            console.log(res);
            currentUser = {
                status: true,
                user: res
            };
            triggerListeners();
        })
    }

    var logout = function() {
        currentUser = {
            status: false,
            user: null
        }
        triggerListeners();
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
        if (split[0] === 'login') {
            switch (split[1]) {
                case "login":
                    login(payload.object);
                    break;
                case "logout":
                    logout();
                    break;
            }
        }
    });

    // create the object for export
    return {
        onChange: onChange
    }
}

module.exports = LoginStore();
