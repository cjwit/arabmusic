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
            items: info.items,
            edited: info.edited,
            editDate: info.editDate
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
    var query = { '_id': req.body.collectionID,
                  'items.item.id': req.body.item.id };
    var update = { $set: {
                   'items.$.item.title': req.body.item.title,
                   'items.$.item.author': req.body.item.author,
                   'items.$.item.link': req.body.item.link,
                   'items.$.item.description': req.body.item.description,
                   'items.$.item.edited': req.body.item.edited,
                   'items.$.item.date': req.body.item.date,
                   'items.$.item.editDate': req.body.item.editDate }}
    Resource.findOneAndUpdate(query, update, { upsert: true, 'new': true }, function (err, updated) {
        if (err) res.send(err);
        else {
            res.json(updated);
        }
    })
}

function deleteItem(req, res) {
    var query = { _id: req.body.collectionID },
        update = { $pull: { items: {'item.id': req.body.item.id }}}
    Resource.update(query, update, function (err, updated) {
        if (err) res.send(err);
        else res.json(updated);
    })
}

module.exports = router;
