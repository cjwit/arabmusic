var dispatcher = require('../dispatcher.js');
var eventService = require('../services/eventService.js');

var EventStore = function() {
    var listeners = [];             // collection of functions

    var getEvents = function(cb) {
        eventService.getEvents().then(function (res) {
            cb(res);
        })
    }

    var onChange = function(listener) {
        getEvents(listener);
        listeners.push(listener);
    }

    var addEvent = function(event) {
        eventService.addEvent(event).then(function (res) {
            console.log(res);
            triggerListeners();
        })
    }

    var deleteEvent = function(event) {
        eventService.deleteEvent(event).then(function(res) {
            console.log(res);
            triggerListeners();
        });
    }

    var triggerListeners = function() {
        getEvents(function (res) {
            listeners.forEach(function(listener) {
                listener(res);
            });
        });
    }

    dispatcher.register(function (payload) {
        var split = payload.type.split(':');
        if (split[0] === 'event') {
            switch (split[1]) {
                case "addEvent":
                    addEvent(payload.object);
                    break;
                case "deleteEvent":
                    deleteEvent(payload.object);
                    break;
            }
        }
    });

    // create the object for export
    return {
        onChange: onChange
    }
}

module.exports = EventStore();
