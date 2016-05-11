var mongoose = require('mongoose');
var User = require('../data/user');
var _ = require('underscore');

var router = require('express').Router();
router.route('/:id').post(login);

function login(req, res) {
    var id = req.params.id;
    var info = req.body;
    var query = { facebookID: id };
    var forCreate = {
        name: info.name,
        email: info.email,
        photo: info.photo,
        provider: 'facebook',
        facebookID: id,
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
