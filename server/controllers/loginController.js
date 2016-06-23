var mongoose = require('mongoose');
var User = require('../data/user');
var _ = require('underscore');
var https = require('https');

var router = require('express').Router();
router.route('/').post(login);

function getUser(user, res) {
    var query = { email: user.email };
    var forCreate = {
        name: user.name,
        email: user.email,
        photo: user.photo,
        provider: user.provider,
        providerID: user.providerID,
        tags: [],
        description: "",
        edited: false,
        joined: new Date(Date.now()),
        editDate: new Date(Date.now())
    };
    User.findOneOrCreate(query, forCreate, function (err, user) {
        user.provider = forCreate.provider;
        if (err) res.send(err);
        else res.json(user);
    });
};

function login(req, res) {

    // update if using a different provider than previous
    var info = req.body;
    var user = {};

    // google login
    if (info.provider === 'google') {
        user.provider = 'google';
        var token = info.token;
        var authURL = 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + token;
        https.get(authURL, function(googleResponse) {
            googleResponse.setEncoding('utf8')
            var body = '';
            googleResponse.on('data', function(d) {
                body += d;
            })
            googleResponse.on('end', function() {
                body = JSON.parse(body);
                if (body.aud === "579992199870-7pa868n4fmu2p7eof8mftosigfsdh8d1.apps.googleusercontent.com") {
                    user.name = body.name;
                    user.email = body.email;
                    user.photo = body.picture;
                    user.providerID = body.sub;
                    getUser(user, res);
                } else {
                    console.log("Error with authorization, token audience does not match App Client ID");
                }
            }).on('error', function(e) {
                console.log('Error: ' + e.message);
            });
        });

    // facebook login
    } else if (info.provider === 'facebook') {
        user.provider = 'facebook';
        user.name = info.name;
        user.email = info.email;
        user.photo = info.photo;
        user.providerID = info.providerID;
        getUser(user, res);
    }
}

module.exports = router;
