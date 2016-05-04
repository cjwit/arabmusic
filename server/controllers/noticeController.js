var mongoose = require('mongoose');
var Notice = require('../data/notice');
var _ = require('underscore');

var router = require('express').Router();
router.route('/:id').post(editNotice).delete(deleteNotice);
router.route('/').get(getNotices).post(addNotice);

function getNotices(req, res) {
    Notice.find(function (err, notices) {
        if (err) res.send(err);
        else res.json(notices);
    });
}

function addNotice(req, res) {
    var notice = new Notice(_.extend({}, req.body));
    notice.save(function (err) {
        if (err) res.send(err);
        else res.json(notice);
    });
}

function editNotice(req, res) {
    var id = req.params.id;
    var info = req.body;
    var query = { _id: id },
        update = { $set: {
            name: info.name,
            location: info.location,
            description: info.description,
            link: info.link,
            eventDate: info.eventDate,
            tags: info.tags,
            edited: info.edited,
            editDate: info.editDate
        }};
    Notice.update(query, update, function (err, updated) {
        if (err) res.send(err);
        else res.json(updated);
    });
}

function deleteNotice(req, res) {
    var id = req.params.id;
    Notice.remove({ _id: id }, function (err, removed) {
        if (err) res.send(err);
        else res.json(removed);
    });
}

module.exports = router;
