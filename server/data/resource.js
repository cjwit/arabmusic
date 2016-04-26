var mongoose = require('mongoose');
var resourceSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    items: Array
});

module.exports = mongoose.model('resource', resourceSchema);

// item = { title, description }
