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
var mailData = {
	from: 'amr.notify@gmail.com',
	to: process.env.EMAIL_TO
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

	mailData.subject = '[AMR.org] New post';
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

	mailData.subject = '[AMR.org] Post edited';
	mailData.text = 'New post' + '\r\n' +
		'Date: ' + info.date + '\r\n' +
		'Title: ' + info.title + '\r\n' +
		'Content: ' + info.content + '\r\n' +
		'Owner Name: ' + info.ownerName + '\r\n' +
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

	mailData.subject = '[AMR.org] Post deleted';
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

		mailData.subject = '[AMR.org] New comment';
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
	var id = req.body.discussionID;
	var comment = req.body.comment;

    var query = { '_id': id,
                  'comments.comment.id': comment.id };
    var update = { $set: {
                   'comments.$.comment.content': comment.content,
                   'comments.$.comment.edited': comment.edited,
                   'comments.$.comment.editDate': comment.editDate }}

	mailData.subject = '[AMR.org] Comment edited';
		mailData.text = 'Comment edit' + '\r\n' +
			'Content: ' + comment.content + '\r\n' +
			'Owner Name: ' + comment.ownerName + '\r\n' +
			'Other information may be available on the site.' + '\r\n' +
			'http://www.arabmusicresearch.org/discussions/' + id;
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

	mailData.subject = '[AMR.org] Comment deleted';
	mailData.text = 'An comment was deleted from the following post.' + '\r\n' +
		'http://www.arabmusicresearch.org/discussions/' + id;
	transporter.sendMail(mailData);

    Post.update(query, update, function (err, updated) {
        if (err) res.send(err);
        else res.json(updated);
    })
}

module.exports = router;
