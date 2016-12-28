var mongoose = require('mongoose');
var Event = require('../data/event');
var _ = require('underscore');

var router = require('express').Router();
router.route('/:id').post(editEvent).delete(deleteEvent);
router.route('/').get(getEvents).post(addEvent);

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
transporter.verify(function(err, success) {
	if (err) {
		console.log(err);
	} else {
		console.log('Email server ready...');
	}
})

var mailData = {
	from: 'amr.notify@gmail.com',
	to: 'chris.witulski@gmail.com'
}

// App functions
function getEvents(req, res) {
    Event.find(function (err, events) {
        if (err) res.send(err);
        else res.json(events);
    });
}

function addEvent(req, res) {
    var event = new Event(_.extend({}, req.body));

	mailData.subject = '[AMR] Event created';
	mailData.text = event.owner + ' created an event called ' + event.name + '\r\n' +
		'Date: ' + event.date.toLocaleString() + '\r\n' +
		'Location: ' + event.location + '\r\n' +
		'Description: ' + event.description + '\r\n' +
		'Other information may be available on the site.'
	transporter.sendMail(mailData);

    event.save(function (err) {
        if (err) res.send(err);
        else res.json(event);
    });
}

function editEvent(req, res) {
    var id = req.params.id;
    var info = req.body;

	mailData.subject = '[AMR] Event edited';
	mailData.text = info.owner + ' updated an event called ' + info.name + '\r\n' +
		'Date: ' + info.date.toLocaleString() + '\r\n' +
		'Location: ' + info.location + '\r\n' +
		'Description: ' + info.description + '\r\n' +
		'Other information may be available on the site.'
	transporter.sendMail(mailData);

    var query = { _id: id },
        update = { $set: {
            name: info.name,
            location: info.location,
            description: info.description,
            date: new Date(info.date),
            tags: info.tags,
            contactName: info.contactName,
            contactEmail: info.contactEmail,
            edited: info.edited,
            editDate: info.editDate
        }};
    Event.update(query, update, function (err, updated) {
        if (err) res.send(err);
        else res.json(updated);
    });
}

function deleteEvent(req, res) {
    var id = req.params.id;

	mailData.subject = '[AMR] Event deleted';
	mailData.text = info.owner + ' deleted event ID ' + id;
	transporter.sendMail(mailData);

    Event.remove({ _id: id }, function (err, removed) {
        if (err) res.send(err);
        else res.json(removed);
    });
}

module.exports = router;
