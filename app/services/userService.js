var $ = require('jquery');
var promise = require('es6-promise');
var resourceURL = location.protocol + '//' + location.host + '/api/user/';

module.exports = {
    getUsers: function() {
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

    addUser: function(user) {
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceURL,
                data: JSON.stringify(user),
                method: "POST",
                dataType: 'json',
                contentType: 'application/json',
                success: resolve,
                error: reject
            });
        });
    },

    editUser: function (user) {
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceURL + user._id,
                data: JSON.stringify(user),
                method: "POST",
                dataType: 'json',
                contentType: 'application/json',
                success: resolve,
                error: reject
            });
        });
    },

    deleteUser: function(user) {
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceURL + user._id,
                method: "DELETE",
                dataType: 'json',
                success: resolve,
                error: reject
            });
        });
    }
}
