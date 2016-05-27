var mongoose = require('mongoose');
var User = require('../data/user');
var _ = require('underscore');

var router = require('express').Router();
router.route('/').post(login);

function login(req, res) {
    // update if using a different provider than previous
    var info = req.body;
    var query = { email: info.email };
    var forCreate = {
        name: info.name,
        email: info.email,
        photo: info.photo,
        provider: info.provider,
        providerID: info.providerID,
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
