var mongoose = require('mongoose');
var Resource = require('../data/resource');
var _ = require('underscore');

var router = require('express').Router();
router.route('/items/').post(addItem);
router.route('/items/delete/').post(deleteItem);
router.route('/items/edit/').post(editItem);
router.route('/:id').post(editCollection).delete(deleteCollection);
router.route('/').get(getResources).post(addCollection);

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

function editCollection(req, res) {
    var id = req.params.id;
    var info = req.body;
    var query = { _id: id },
        update = { $set: {
            title: info.title,
            description: info.description,
            tags: info.tags,
            items: info.items
        }};
    Resource.update(query, update, function (err, updated) {
        if (err) res.send(err);
        else res.json(updated);
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

function editItem(req, res) {
    var collectionID = req.body.collectionID;
    var itemID = req.body.item.id;
    var title = req.body.item.title;
    var description = req.body.item.description;
    console.log(title, description);

    var query = { '_id': collectionID, 'items.item.id': itemID };
    var update = { $set: { 'items.$.item.title': title, 'items.$.item.description': description }}
    Resource.findOneAndUpdate(query, update, function (err, updated) {
        if (err) res.send(err);
        else res.json(updated);
    })
}

function deleteItem(req, res) {
    var body = {
        collectionID: req.body.collectionID,
        item: {
            title: req.body.item.title,
            description: req.body.item.description,
            author: req.body.item.author
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
