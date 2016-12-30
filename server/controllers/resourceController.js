var mongoose = require('mongoose');
var Resource = require('../data/resource');
var _ = require('underscore');

var router = require('express').Router();
router.route('/items/').post(addItem);
router.route('/items/delete/').post(deleteItem);
router.route('/items/edit/').post(editItem);
router.route('/:id').post(editCollection).delete(deleteCollection);
router.route('/').get(getResources).post(addCollection);

// nodemailer
var nodemailer = require('nodemailer');
var smtpConfig = {
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: 'amr.notify@gmail.com',
		pass: process.env.EMAIL_PASSWORD
	}
};
var transporter = nodemailer.createTransport(smtpConfig);
var mailData = {
	from: 'amr.notify@gmail.com',
	to: process.env.EMAIL_TO
}

// App functions
function getResources(req, res) {
    Resource.find(function (err, resources) {
        if (err) res.send(err);
        else res.json(resources);
    });
}

function addCollection(req, res) {
    var collection = new Resource(_.extend({}, req.body));

	mailData.subject = '[AMR.org] New resource collection';
	mailData.text = 'New resource collection' + '\r\n' +
		'Title: ' + collection.title + '\r\n' +
		'Owner Name: ' + collection.ownerName + '\r\n' +
		'Other information may be available on the site.'
	transporter.sendMail(mailData);

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
            owner: info.owner,
            ownerName: info.ownerName,
            edited: info.edited,
            editDate: info.editDate
        }};

	mailData.subject = '[AMR.org] Resource collection edited';
	mailData.text = 'Resource collection edited' + '\r\n' +
		'Title: ' + info.title + '\r\n' +
		'Owner Name: ' + info.ownerName + '\r\n' +
		'Other information may be available on the site.' + '\r\n' +
		'http://www.arabmusicresearch.org/resources/' + id;
	transporter.sendMail(mailData);

    Resource.update(query, update, function (err, updated) {
        if (err) res.send(err);
        else res.json(updated);
    });
}

function deleteCollection(req, res) {
    var id = req.params.id;

	mailData.subject = '[AMR.org] Resource collection deleted';
	mailData.text = 'A resource collection was deleted. ID: ' + id;
	transporter.sendMail(mailData);

    Resource.remove({ _id: id }, function (err, removed) {
        if (err) res.send(err);
        else res.json(removed);
    });
}

function addItem(req, res) {
    var id = req.body.collectionID;
	var item = req.body.item;
    var query = { _id: id },
        update = { $push: { items: req.body }};

	mailData.subject = '[AMR.org] New resource item';
	mailData.text = 'New resource item' + '\r\n' +
		'Title: ' + item.title + '\r\n' +
		'Description: ' + item.description + '\r\n' +
		'Other information may be available on the site.' + '\r\n' +
		'http://www.arabmusicresearch.org/resources/' + id;
	transporter.sendMail(mailData);

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
                   'items.$.item.ownerName': req.body.item.ownerName,
                   'items.$.item.owner': req.body.item.owner,
                   'items.$.item.link': req.body.item.link,
                   'items.$.item.description': req.body.item.description,
                   'items.$.item.edited': req.body.item.edited,
                   'items.$.item.date': req.body.item.date,
                   'items.$.item.editDate': req.body.item.editDate }};
	var item = req.body.item;
	var id = req.body.collectionID;

	mailData.subject = '[AMR.org] Resource item edited';
   	mailData.text = 'Resource item edited' + '\r\n' +
   		'Title: ' + item.title + '\r\n' +
   		'Description: ' + item.description + '\r\n' +
   		'Other information may be available on the site.' + '\r\n' +
   		'http://www.arabmusicresearch.org/resources/' + id;
   	transporter.sendMail(mailData);

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
	var id = req.body.collectionID;

	mailData.subject = '[AMR.org] Resource item deleted';
	mailData.text = 'A resource item was deleted from the following collection.' + '\r\n' +
		'http://www.arabmusicresearch.org/resources/' + id;
	transporter.sendMail(mailData);

	Resource.update(query, update, function (err, updated) {
        if (err) res.send(err);
        else res.json(updated);
    })
}

module.exports = router;
