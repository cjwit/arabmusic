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
var mailData = {
	from: 'amr.notify@gmail.com',
	to: process.env.EMAIL_TO
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

	mailData.subject = '[AMR.org] Event created';
	mailData.text = 'New event called ' + event.name + '\r\n' +
		'Date: ' + event.date + '\r\n' +
		'Location: ' + event.location + '\r\n' +
		'Description: ' + event.description + '\r\n' +
		'Owner ID: ' + event.owner + '\r\n' +
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

	mailData.subject = '[AMR.org] Event edited';
	mailData.text = info.name + ' updated.' + '\r\n' +
		'Date: ' + info.date + '\r\n' +
		'Location: ' + info.location + '\r\n' +
		'Description: ' + info.description + '\r\n' +
		'Owner ID: ' + info.owner + '\r\n' +
		'Other information may be available on the site.' + '\r\n' +
		'http://www.arabmusicresearch.org/events/' + id;
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

	mailData.subject = '[AMR.org] Event deleted';
	mailData.text = 'An event was deleted. ID: ' + id;
	transporter.sendMail(mailData);

    Event.remove({ _id: id }, function (err, removed) {
        if (err) res.send(err);
        else res.json(removed);
    });
}

module.exports = router;
