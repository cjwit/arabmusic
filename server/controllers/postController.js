var mongoose = require('mongoose');
var Post = require('../data/post');
var _ = require('underscore');

var router = require('express').Router();
router.route('/comments/').post(addComment);
router.route('/comments/delete/').post(deleteComment);
router.route('/comments/edit/').post(editComment);
router.route('/:id').post(editPost).delete(deletePost);
router.route('/').get(getPosts).post(addPost);

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
function getPosts(req, res) {
    Post.find(function (err, posts) {
        if (err) res.send(err);
        else res.json(posts);
    });
}

function addPost(req, res) {
    var post = new Post(_.extend({}, req.body));

	mailData.subject = '[AMR] New post';
	mailData.text = 'New post' + '\r\n' +
		'Date: ' + post.date + '\r\n' +
		'Title: ' + post.title + '\r\n' +
		'Content: ' + post.content + '\r\n' +
		'Owner Name: ' + post.ownerName + '\r\n' +
		'Other information may be available on the site.'
	transporter.sendMail(mailData);

    post.save(function (err) {
        if (err) res.send(err);
        else res.json(post);
    });
}

function editPost(req, res) {
    var id = req.params.id;
    var info = req.body;

	mailData.subject = '[AMR] Post edited';
	mailData.text = 'New post' + '\r\n' +
		'Date: ' + post.date + '\r\n' +
		'Title: ' + post.title + '\r\n' +
		'Content: ' + post.content + '\r\n' +
		'Owner Name: ' + post.ownerName + '\r\n' +
		'Other information may be available on the site.' + '\r\n' +
		'http://www.arabmusicresearch.org/discussions/' + id;
	transporter.sendMail(mailData);

    var query = { _id: id },
        update = { $set: {
            title: info.title,
            content: info.content,
            tags: info.tags,
            comments: info.comments,
            edited: info.edited,
            editDate: info.editDate
        }};
    Post.update(query, update, function (err, updated) {
        if (err) res.send(err);
        else res.json(updated);
    });
}

function deletePost(req, res) {
    var id = req.params.id;

	mailData.subject = '[AMR] Post deleted';
	mailData.text = 'An post was deleted. ID: ' + id;
	transporter.sendMail(mailData);

    Post.remove({ _id: id }, function (err, removed) {
        if (err) res.send(err);
        else res.json(removed);
    });
}

function addComment(req, res) {
    var id = req.body.discussionID;
    var query = { _id: id },
        update = { $push: { comments: req.body }}

		mailData.subject = '[AMR] New comment';
		mailData.text = 'New comment' + '\r\n' +
			'Content: ' + req.body.comment.content + '\r\n' +
			'Owner Name: ' + req.body.comment.ownerName + '\r\n' +
			'Other information may be available on the site.' + '\r\n' +
			'http://www.arabmusicresearch.org/discussions/' + id;
		transporter.sendMail(mailData);

    Post.update(query, update, function (err, updated) {
        if (err) res.send(err);
        else res.json(updated);
    })
}

function editComment(req, res) {
    var query = { '_id': req.body.discussionID,
                  'comments.comment.id': req.body.comment.id };
    var update = { $set: {
                   'comments.$.comment.content': req.body.comment.content,
                   'comments.$.comment.edited': req.body.comment.edited,
                   'comments.$.comment.editDate': req.body.comment.editDate }}

	mailData.subject = '[AMR] Comment edited';
		mailData.text = 'Comment edit' + '\r\n' +
			'Content: ' + req.body.comment.content + '\r\n' +
			'Owner Name: ' + req.body.comment.ownerName + '\r\n' +
			'Other information may be available on the site.' + '\r\n' +
			'http://www.arabmusicresearch.org/discussions/' + req.body.discussionID;
	transporter.sendMail(mailData);

	Post.findOneAndUpdate(query, update, function (err, updated) {
        if (err) res.send(err);
        else res.json(updated);
    })
}

function deleteComment(req, res) {
    var id = req.body.discussionID;
    var query = { _id: id },
        update = { $pull: { comments: {'comment.id': req.body.comment.id }}}

	mailData.subject = '[AMR] Comment deleted';
	mailData.text = 'An comment was deleted from the following post.' + '\r\n' +
		'http://www.arabmusicresearch.org/discussions/' + req.body.discussionID;
	transporter.sendMail(mailData);

    Post.update(query, update, function (err, updated) {
        if (err) res.send(err);
        else res.json(updated);
    })
}

module.exports = router;
