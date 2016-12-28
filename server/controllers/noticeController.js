var mongoose = require('mongoose');
var Notice = require('../data/notice');
var _ = require('underscore');

var router = require('express').Router();
router.route('/:id').post(editNotice).delete(deleteNotice);
router.route('/').get(getNotices).post(addNotice);

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
function getNotices(req, res) {
    Notice.find(function (err, notices) {
        if (err) res.send(err);
        else res.json(notices);
    });
}

function addNotice(req, res) {
    var notice = new Notice(_.extend({}, req.body));

	mailData.subject = '[AMR] Notice created';
	mailData.text = 'New notice called ' + notice.name + '\r\n' +
		'Description: ' + notice.description + '\r\n' +
		'Owner ID: ' + notice.owner + '\r\n' +
		'Other information may be available on the site.'
	transporter.sendMail(mailData);

    notice.save(function (err) {
        if (err) res.send(err);
        else res.json(notice);
    });
}

function editNotice(req, res) {
    var id = req.params.id;
    var info = req.body;

	mailData.subject = '[AMR] Notice edited';
	mailData.text = 'Notice edited.' + '\r\n' +
		'Name: ' + info.name + '\r\n' +
		'Description: ' + info.description + '\r\n' +
		'Owner ID: ' + info.owner + '\r\n' +
		'Other information may be available on the site.' + '\r\n' +
		'http://www.arabmusicresearch.org/notices/' + id;
	transporter.sendMail(mailData);

    var query = { _id: id },
        update = { $set: {
            name: info.name,
            location: info.location,
            description: info.description,
            link: info.link,
            date: info.date,
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

	mailData.subject = '[AMR] Notice deleted';
	mailData.text = 'A notice was deleted. ID: ' + id;
	transporter.sendMail(mailData);

    Notice.remove({ _id: id }, function (err, removed) {
        if (err) res.send(err);
        else res.json(removed);
    });
}

module.exports = router;
