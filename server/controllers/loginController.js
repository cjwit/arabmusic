var mongoose = require('mongoose');
var User = require('../data/user');
var _ = require('underscore');
var https = require('https');

var router = require('express').Router();
router.route('/').post(login);

function login(req, res) {
    // update if using a different provider than previous
    var info = req.body;
    if (info.provider === 'google') {
        var token = info.token;
        var authURL = 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + token;
        var name, email, providerID, photo;
        https.get(authURL, function(res) {
            res.setEncoding('utf8')
            var body = '';
            res.on('data', function(d) {
                body += d;
            })
            res.on('end', function() {
                body = JSON.parse(body);
                if (body.aud === "579992199870-7pa868n4fmu2p7eof8mftosigfsdh8d1.apps.googleusercontent.com") {
                    name = body.name;
                    email = body.email;
                    providerID = body.sub;
                } else {
                    console.log("Error with authorization, token audience does not match App Client ID");
                }
            }).on('error', function(e) {
                console.log('Error: ' + e.message);
            });
        });
    } else if (info.provider === 'facebook') {
        name = info.name;
        email = info.email;
        photo = info.photo;
        providerID = info.providerID;
    }

    var query = { email: email };
    var forCreate = {
        name: name,
        email: email,
        photo: photo,
        provider: info.provider,
        providerID: providerID,
        tags: [],
        description: "",
        edited: false,
        joined: new Date(Date.now()),
        editDate: new Date(Date.now())
    };
    User.findOneOrCreate(query, forCreate, function (err, user) {
        if (err) res.send(err);
        else res.json(user);
    });
}

module.exports = router;
