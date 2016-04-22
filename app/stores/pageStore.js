var dispatcher = require('../dispatcher.js');

var PageStore = function() {
    var listeners = [];             // collection of functions
    var target = 'home';

    var getTarget = function() {
        return target;
    }

    var onChange = function(listener) {
        listeners.push(listener);
    }

    var changePage = function(_target) {
        target = _target;
        triggerListeners();
    }

    var triggerListeners = function() {
        listeners.forEach(function(listener) {
            listener(events);
        })
    }

    dispatcher.register(function (payload) {
        var split = payload.type.split(':');
        if (split[0] === 'page') {
            switch (split[1]) {
                case "changePage":
                    changePage(payload.object);
                    break;
            }
        }
    });

    // create the object for export
    return {
        getTarget: getTarget,
        onChange: onChange
    }
}

module.exports = PageStore();
