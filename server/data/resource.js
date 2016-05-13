var mongoose = require('mongoose');
var resourceSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    tags: Array,
    owner: { type: String, required: true },
    ownerName: { type: String, required: true },
    items: Array,
    date: Date,
    edited: Boolean,
    editDate: Date
});

module.exports = mongoose.model('resource', resourceSchema);

// item = { title, description }
