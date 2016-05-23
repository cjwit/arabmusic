var mongoose = require('mongoose');
var postSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, required: true },
    ownerName: { type: String, required: true },
    owner: String,
    tags: Array,
    comments: Array,
    edited: Boolean,
    editDate: Date
});

module.exports = mongoose.model('post', postSchema);
