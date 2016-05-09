var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var compress = require('compression');
var passport = require('passport');
var session = require('express-session');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('./data/user.js');

// controllers
var eventController = require('./controllers/eventController');
var postController = require('./controllers/postController');
var resourceController = require('./controllers/resourceController');
var noticeController = require('./controllers/noticeController');
var userController = require('./controllers/userController');

// requests
var app = express();
app.use(compress())
app.use(express.static(path.join(__dirname, "../app/dist")));
app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/events", eventController);
app.use("/api/posts", postController);
app.use("/api/resources", resourceController);
app.use("/api/notices", noticeController);
app.use("/api/user", userController);

// authentication
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new FacebookStrategy({
        clientID: process.env.FB_CLIENT_ID,
        clientSecret: process.env.FB_CLIENT_SECRET,
        callbackURL: process.env.FB_CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(profile);
        User.findOne({
            'facebook.id': profile.id
        }, function(err, user) {
            if (err) {
                return done(err);
            }

            // did not find the user's facebook id, creating new user
            if (!user) {
                user = new User({
                    name: profile.displayName,
                    provider: 'facebook',
                    facebook: profile._json
                });
                user.save(function(err) {
                    if (err) console.log(err);
                    return done(err, user);
                })

            // found the user's facebook id
            } else {
                return done(err, user);
            }
        });
    }
));

// page routing
app.get('/auth/facebook',
    passport.authenticate('facebook', { scope: ['email', 'public_profile']})
);
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/user',
        failureRedirect: '/user'
    }
));

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../app/dist/index.html'));
})

// listen
var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log("Listening on port ", port, "...");
});

// connect to database
var dblogin = process.env.DBLOGIN;
var dbpassword = process.env.DBPASSWORD;

var dburl = 'mongodb://<dbuser>:<dbpassword>@ds019481.mlab.com:19481/arabmusictest'
    .replace("<dbuser>", dblogin)
    .replace('<dbpassword>', dbpassword);
mongoose.connect(dburl)
