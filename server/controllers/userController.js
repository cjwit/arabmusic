var mongoose = require('mongoose');
var User = require('../data/user');
var _ = require('underscore');

var router = require('express').Router();
router.route('/:id/').get(getUser);
router.route('/').get(getUsers);

function getUsers(req, res) {
    User.find(function (err, users) {
        if (err) res.send(err);
        else res.json(users);
    });
}

function getUser(req, res) {
    var id = req.params.id;
    User.find({ 'facebook.id': id }, function(err, user) {
        if (err) res.send(err);
        else res.json(user);
    })
}

module.exports = router;
