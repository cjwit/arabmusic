var $ = require('jquery');
var promise = require('es6-promise');
var resourceURL = location.protocol + '//' + location.host + '/api/events/';

module.exports = {
    getEvents: function() {
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceURL,
                method: "GET",
                dataType: 'json',
                success: resolve,
                error: reject
            });
        });
    },

    addEvent: function (event) {
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceURL,
                data: JSON.stringify(event),
                method: "POST",
                dataType: 'json',
                contentType: 'application/json',
                success: resolve,
                error: reject
            });
        });
    },

    editEvent: function (event) {
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceURL + event.id,
                data: JSON.stringify(event),
                method: "POST",
                dataType: 'json',
                contentType: 'application/json',
                success: resolve,
                error: reject
            });
        });
    },

    deleteEvent: function(event) {
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceURL + event._id,
                method: "DELETE",
                dataType: 'json',
                success: resolve,
                error: reject
            });
        });
    }
}
