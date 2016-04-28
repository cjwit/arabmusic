var $ = require('jquery');
var promise = require('es6-promise');
var resourceURL = location.protocol + '//' + location.host + '/api/resources/';

module.exports = {
    getResources: function() {
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

    addCollection: function (collection) {
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceURL,
                data: JSON.stringify(collection),
                method: "POST",
                dataType: 'json',
                contentType: 'application/json',
                success: resolve,
                error: reject
            });
        });
    },

    editCollection: function (collection) {
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceURL + collection.id,
                data: JSON.stringify(collection),
                method: "POST",
                dataType: 'json',
                contentType: 'application/json',
                success: resolve,
                error: reject
            });
        });
    },

    deleteCollection: function(collection) {
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceURL + collection._id,
                method: "DELETE",
                dataType: 'json',
                success: resolve,
                error: reject
            });
        });
    },

    // object {collectionID, item}
    addItem: function (itemObject) {
        var Promise = promise.Promise;
        var itemURL = resourceURL + 'items/'
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: itemURL,
                data: JSON.stringify(itemObject),
                method: "POST",
                dataType: 'json',
                contentType: 'application/json',
                success: resolve,
                error: reject
            });
        });
    },

    // object {collectionID, item}
    deleteItem: function (commentObject) {
        var Promise = promise.Promise;
        var itemURL = resourceURL + 'items/delete/'
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: itemURL,
                data: JSON.stringify(commentObject),
                method: "POST",
                dataType: 'json',
                contentType: 'application/json',
                success: resolve,
                error: reject
            });
        });
    }

}
