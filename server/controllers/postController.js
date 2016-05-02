var mongoose = require('mongoose');
var Post = require('../data/post');
var _ = require('underscore');

var router = require('express').Router();
router.route('/comments/').post(addComment);
router.route('/comments/delete/').post(deleteComment);
router.route('/comments/edit/').post(editComment);
router.route('/:id').post(editPost).delete(deletePost);
router.route('/').get(getPosts).post(addPost);

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

function editPost(req, res) {
    var id = req.params.id;
    var info = req.body;
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

function editComment(req, res) {
    var query = { '_id': req.body.discussionID,
                  'comments.comment.id': req.body.comment.id };
    var update = { $set: {
                   'comments.$.comment.content': req.body.comment.content,
                   'comments.$.comment.edited': req.body.comment.edited,
                   'comments.$.comment.editDate': req.body.comment.editDate }}
    Post.findOneAndUpdate(query, update, function (err, updated) {
        if (err) res.send(err);
        else res.json(updated);
    })
}

function deleteComment(req, res) {
    var id = req.body.discussionID;
    var query = { _id: id },
        update = { $pull: { comments: {'comment.id': req.body.comment.id }}}
    Post.update(query, update, function (err, updated) {
        if (err) res.send(err);
        else res.json(updated);
    })
}

module.exports = router;
