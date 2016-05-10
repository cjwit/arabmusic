var mongoose = require('mongoose');
var findOneOrCreate = require('mongoose-find-one-or-create');
var userSchema = mongoose.Schema({
    name: String,
    email: String,
    provider: String,
    facebookID: String,
    date: Date,
    photo: String,
    tags: Array,
    description: String,
    joined: Date,
    edited: Boolean,
    editDate: Date,
    accessToken: String,
    refreshToken: String
});

userSchema.plugin(findOneOrCreate);

module.exports = mongoose.model('user', userSchema);
