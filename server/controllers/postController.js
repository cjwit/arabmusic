var mongoose = require('mongoose');
var Post = require('../data/post');
var _ = require('underscore');

var router = require('express').Router();
router.route('/comments/').post(addComment);
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
    var id = req.params.id;
    var comment = req.body;
    console.log('postController.addComment', id, comment)
    var query = { _id: id },
        update = { $push: { comments: comment }}
    Post.update(query, update, function (err, updated) {
        if (err) res.send(err);
        else res.json(updated);
    })
}

module.exports = router;
