var mongoose = require('mongoose');
var User = require('../data/user');
var _ = require('underscore');

var router = require('express').Router();
router.route('/:id').post(login);

function login(req, res) {
    var id = req.params.id;
    var info = req.body;
    var query = { 'facebook.id': id };
    User.find(query, function (err, user) {
        if (err) res.send(err);
        else res.json(user);
    });
}

module.exports = router;
