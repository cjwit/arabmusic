var mongoose = require('mongoose');
var Post = require('../data/post');
var _ = require('underscore');

var router = require('express').Router();
router.route('/comments/').post(addComment);
router.route('/comments/delete/').post(deleteComment);
router.route('/:id?').get(getPosts).post(addPost).delete(deletePost);

function getPosts(req, res) {
    Post.find(function (err, posts) {
        if (err) res.send(err);
        else res.json(posts);
    });
}

function addPost(req, res) {
    var post = new Post(_.extend({}, req.body));
    post.save(function (err) {
        if (err) res.send(err);
        else res.json(post);
    });
}

function deletePost(req, res) {
    var id = req.params.id;
    Post.remove({ _id: id }, function (err, removed) {
        if (err) res.send(err);
        else res.json(removed);
    });
}

function addComment(req, res) {
    var id = req.body.discussionID;
    var query = { _id: id },
        update = { $push: { comments: req.body }}
    Post.update(query, update, function (err, updated) {
        if (err) res.send(err);
        else res.json(updated);
    })
}

function deleteComment(req, res) {
    var body = {
        discussionID: req.body.discussionID,
        comment: {
            author: req.body.comment.author,
            date: req.body.comment.date,
            content: req.body.comment.content
        }
    }
    var id = req.body.discussionID;
    var query = { _id: id },
        update = { $pull: { comments: body }}

    Post.update(query, update, function (err, updated) {
        if (err) res.send(err);
        else res.json(updated);
    })
}

module.exports = router;
