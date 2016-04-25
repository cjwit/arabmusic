var mongoose = require('mongoose');
var Event = require('../data/event');
var _ = require('underscore');

var router = require('express').Router();
router.route('/:id?').get(getEvents).post(addEvent).delete(deleteEvent);

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

function deleteEvent(req, res) {
    var id = req.params.id;
    Event.remove({ _id: id }, function (err, removed) {
        if (err) res.send(err);
        else res.json(removed);
    });
}

module.exports = router;
