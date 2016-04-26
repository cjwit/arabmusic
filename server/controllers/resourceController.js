var mongoose = require('mongoose');
var Resource = require('../data/resource');
var _ = require('underscore');

var router = require('express').Router();
router.route('/items/').post(addItem);
router.route('/items/delete/').post(deleteItem);
router.route('/:id?').get(getResources).post(addCollection).delete(deleteCollection);

function getResources(req, res) {
    Resource.find(function (err, resources) {
        if (err) res.send(err);
        else res.json(resources);
    });
}

function addCollection(req, res) {
    var collection = new Resource(_.extend({}, req.body));
    collection.save(function (err) {
        if (err) res.send(err);
        else res.json(collection);
    });
}

function deleteCollection(req, res) {
    var id = req.params.id;
    Resource.remove({ _id: id }, function (err, removed) {
        if (err) res.send(err);
        else res.json(removed);
    });
}

function addItem(req, res) {
    var id = req.body.collectionID;
    var query = { _id: id },
        update = { $push: { items: req.body }}
    Resource.update(query, update, function (err, updated) {
        if (err) res.send(err);
        else res.json(updated);
    })
}

function deleteItem(req, res) {
    var body = {
        collectionID: req.body.collectionID,
        item: {
            title: req.body.item.title,
            description: req.body.item.description
        }
    }
    var id = req.body.collectionID;
    var query = { _id: id },
        update = { $pull: { items: body }}

    Resource.update(query, update, function (err, updated) {
        if (err) res.send(err);
        else res.json(updated);
    })
}

module.exports = router;
