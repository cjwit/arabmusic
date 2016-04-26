var dispatcher = require('../dispatcher.js');
var resourceService = require('../services/resourceService.js');

var ResourceStore = function() {
    var listeners = [];

    var getResources = function(cb) {
        resourceService.getResources().then(function (res) {
            cb(res);
        });
    }

    var onChange = function(listener) {
        getResources(listener);
        listeners.push(listener);
    }

    var addCollection = function(collection) {
        resourceService.addCollection(collection).then(function (res) {
            console.log(res);
            triggerListeners();
        });
    }

    var deleteCollection = function(collection) {
        resourceService.deleteCollection(collection).then(function(res) {
            console.log(res);
            triggerListeners();
        });
    }

    var addItem = function(itemObject) {
        resourceService.addItem(itemObject).then(function(res) {
            console.log(res);
            triggerListeners();
        });
    }

    var deleteItem = function(itemObject) {
        resourceService.deleteItem(itemObject).then(function(res) {
            console.log(res);
            triggerListeners();
        });
    }

    var triggerListeners = function() {
        getResources(function (res) {
            listeners.forEach(function(listener) {
                listener(res);
            });
        });
    }

    dispatcher.register(function (payload) {
        var split = payload.type.split(':');
        if (split[0] === 'resource') {
            switch (split[1]) {
                case "addCollection":
                    addCollection(payload.object);
                    break;
                case "deleteCollection":
                    deleteCollection(payload.object);
                    break;
                case "addItem":
                    addItem(payload.object);
                    break;
                case "deleteItem":
                    deleteItem(payload.object);
                    break;
            }
        }
    });

    // create the object for export
    return {
        onChange: onChange
    }
}

module.exports = ResourceStore();
