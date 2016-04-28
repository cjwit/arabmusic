var $ = require('jquery');
var promise = require('es6-promise');
var resourceURL = location.protocol + '//' + location.host + '/api/posts/';

module.exports = {
    getPosts: function() {
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

    addPost: function (post) {
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceURL,
                data: JSON.stringify(post),
                method: "POST",
                dataType: 'json',
                contentType: 'application/json',
                success: resolve,
                error: reject
            });
        });
    },

    editPost: function (post) {
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceURL + post.id,
                data: JSON.stringify(post),
                method: "POST",
                dataType: 'json',
                contentType: 'application/json',
                success: resolve,
                error: reject
            });
        });
    },

    deletePost: function(post) {
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceURL + post._id,
                method: "DELETE",
                dataType: 'json',
                success: resolve,
                error: reject
            });
        });
    },

    // object {discussionID, comment}
    addComment: function (commentObject) {
        var Promise = promise.Promise;
        var commentURL = resourceURL + 'comments/'
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: commentURL,
                data: JSON.stringify(commentObject),
                method: "POST",
                dataType: 'json',
                contentType: 'application/json',
                success: resolve,
                error: reject
            });
        });
    },

    // object {discussionID, comment}
    deleteComment: function (commentObject) {
        var Promise = promise.Promise;
        var commentURL = resourceURL + 'comments/delete/'
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: commentURL,
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
