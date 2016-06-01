var mongoose = require('mongoose');
var User = require('../data/user');
var _ = require('underscore');

var router = require('express').Router();
router.route('/:id').post(editUser).delete(deleteUser);
router.route('/').get(getUsers).post(addUser);

function getUsers(req, res) {
    User.find(function (err, users) {
        if (err) res.send(err);
        else res.json(users);
    });
}

function addUser(req, res) {
    var user = new User(_.extend({}, req.body));
    User.save(function (err) {
        if (err) res.send(err);
        else res.json(user);
    });
}

function editUser(req, res) {
    var info = req.body;
    var query = { _id: info.id },
        update = { $set: {
            name: info.name,
            email: info.email,
            photo: info.photo,
            provider: info.provider,
            description: info.description,
            joined: new Date(info.date),
            tags: info.tags,
            edited: info.edited,
            editDate: info.editDate
        }};
    console.log(info);
    User.update(query, update, function (err, updated) {
        if (err) res.send(err);
        else res.json(updated);
    });
}

function deleteUser(req, res) {
    var id = req.params.id;
    User.remove({ _id: id }, function (err, removed) {
        if (err) res.send(err);
        else res.json(removed);
    });
}

module.exports = router;
