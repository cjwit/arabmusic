var mongoose = require('mongoose');
var noticeSchema = mongoose.Schema({
    name: { type: String, required: true },
    location: String,
    description: { type: String, required: true },
    link: String,
    postDate: Date,
    date: Date,
    tags: Array,
    owner: { type: String, required: true },
    edited: Boolean,
    editDate: Date
});

module.exports = mongoose.model('notice', noticeSchema);
