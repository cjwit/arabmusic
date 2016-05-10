var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    name: String,
    email: String,
    provider: String,
    facebook: Object,
    date: Date,
    photo: String,
    tags: Array,
    description: String,
    edited: Boolean,
    editDate: Date,
    accessToken: String,
    refreshToken: String
});

module.exports = mongoose.model('user', userSchema);
