var mongoose = require('mongoose');
var resourceSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    tags: Array,
    items: Array
});

module.exports = mongoose.model('resource', resourceSchema);

// item = { title, description }
