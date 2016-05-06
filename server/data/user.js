var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    name: String,
    email: String,
    provider: String,
    facebook: Object,
    tags: Array,
    description: String,
    accessToken: String,
    refreshToken: String
});

module.exports = mongoose.model('user', userSchema);
