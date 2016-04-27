var mongoose = require('mongoose');
var eventSchema = mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    tags: Array,
    owner: { type: String, required: true }
});

module.exports = mongoose.model('event', eventSchema);
