var $ = require('jquery');
var promise = require('es6-promise');
var resourceURL = location.protocol + '//' + location.host + '/api/login/';

module.exports = {
    login: function(loginObject) {
        var Promise = promise.Promise;
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: resourceURL,
                data: JSON.stringify(loginObject),
                method: "POST",
                dataType: 'json',
                contentType: 'application/json',
                success: resolve,
                error: reject
            });
        });
    }
}
