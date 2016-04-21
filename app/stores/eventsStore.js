var dispatcher = require('../dispatcher.js');
var Dummy = require('../dummycontent.js');

var EventStore = function() {
    var listeners = [];             // collection of functions
    var events = Dummy.events;

    var getEvents = function() {
        return events;
    }

    var onChange = function(listener) {
        listeners.push(listener);
    }

    var addEvent = function(event) {
        events.push(event);
        triggerListeners();
    }

    var deleteEvent = function(event) {
        var _index;
        var eventID = event.title + event.date.getTime();
        events.map(function(e, index) {
            var eID = e.title + e.date.getTime();
            if (eID === eventID) {
                _index = index;
            }
        });
        events.splice(_index, 1);
        triggerListeners();
    }

    var triggerListeners = function() {
        listeners.forEach(function(listener) {
            listener(events);
        })
    }

    dispatcher.register(function (payload) {
        var split = payload.type.split(':');
        if (split[0] === 'event') {
            switch (split[1]) {
                case "addEvent":
                    addEvent(payload.event);
                    break;
                case "deleteEvent":
                    deleteEvent(payload.event);
                    break;
            }
        }
    });

    // create the object for export
    return {
        getEvents: getEvents,
        onChange: onChange
    }
}

module.exports = EventStore();
