var mongoose = require('mongoose');
var Event = require('../data/event');
var _ = require('underscore');

var router = require('express').Router();
router.route('/:id').post(editEvent).delete(deleteEvent);
router.route('/').get(getEvents).post(addEvent);

function getEvents(req, res) {
    Event.find(function (err, events) {
        if (err) res.send(err);
        else res.json(events);
    });
}

function addEvent(req, res) {
    var event = new Event(_.extend({}, req.body));
    event.save(function (err) {
        if (err) res.send(err);
        else res.json(event);
    });
}

function editEvent(req, res) {
    var id = req.params.id;
    var info = req.body;
    console.log('editEvent', id, info);
    var query = { _id: id },
        update = { $set: {
            name: info.name,
            location: info.location,
            description: info.description,
            date: new Date(info.date),
            tags: info.tags
        }};
    Event.update(query, update, function (err, updated) {
        if (err) res.send(err);
        else res.json(updated);
    });
}

function deleteEvent(req, res) {
    var id = req.params.id;
    Event.remove({ _id: id }, function (err, removed) {
        if (err) res.send(err);
        else res.json(removed);
    });
}

module.exports = router;
