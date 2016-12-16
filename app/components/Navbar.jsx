var React = require('react');
var actions = require('../actions/loginActions');

module.exports = React.createClass({
    componentDidMount: function() {
        // Facebook login setup
        this.facebookLoginSetup();

        // Google login setup
        this.googleLoginSetup();
    },

    googleLoginSetup: function() {
        var googleUser = {};
        var _this = this;
        var auth2;
        var registerGoogleUser = this.registerGoogleUser;

        var startApp = function() {
            gapi.load('auth2', function(){
                auth2 = gapi.auth2.init({
                    client_id: '579992199870-7pa868n4fmu2p7eof8mftosigfsdh8d1.apps.googleusercontent.com'
                });
                var googleAuth = gapi.auth2.getAuthInstance();

                // listen for changes to current user
                googleAuth.currentUser.listen(function(user) {
                    if (googleAuth.isSignedIn.get()) {
                        registerGoogleUser(user);
                    }
                })
            });
        };
        startApp();
    },

    googleLogin: function() {
        var googleAuth = gapi.auth2.getAuthInstance();
        var registerGoogleUser = this.registerGoogleUser;
        googleAuth.signIn().then(function() {
            googleUser = googleAuth.currentUser.get();
            registerGoogleUser(googleUser);
        });
    },

    registerGoogleUser: function(googleUser) {
        var token = googleUser.getAuthResponse().id_token;
        var loginObject = {
            token: token,
            provider: 'google',
        }
        actions.login(loginObject);
    },

    googleLogout: function() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut(actions.logout())
            .then(function () {
                console.log('User signed out (Google).');
            });
        // still not allowing re-login after logout
        this.googleLoginSetup();
    },

    facebookLoginSetup: function() {
        window.fbAsyncInit = function() {
            FB.init({
                // appId      : '509714599153204', // local version
                appId      : '503327943125203', // deployed version
                cookie     : true,
                xfbml      : true,
                version    : 'v2.6'
            });

            FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                    this.facebookLoginCallback(response)
                } else {
                    actions.logout();
                }
            }.bind(this));
        }.bind(this);

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    },

    facebookApiCallback: function(response) {
        var loginObject = {
            name: response.name,
            providerID: response.id,
            email: response.email,
            provider: 'facebook',
            photo: response.picture.data.url
        }
        actions.login(loginObject);
    },

    facebookLoginCallback: function(response) {
        if (response.authResponse) {
            FB.api('/me', { fields: 'name,email,picture' }, this.facebookApiCallback);
        } else {
            console.log('FB login failed or cancelled');
        }
    },

    facebookLogin: function() {
        FB.login(this.facebookLoginCallback, { scope: 'email,public_profile' });
    },

    facebookLogout: function() {
        FB.logout(actions.logout());
        console.log('User signed out (Facebook).')
    },

    render: function() {
        var active = this.props.active;
        var login = this.props.login;
        var userHomeLink = null,
            facebookLoginButton = null,
            facebookLogoutButton = null,
            googleLoginButton = null,
            googleLogoutButton = null;

        if (login.status === true) {
            // create logout buttons
            var facebookLogoutButton = login.user.provider === 'facebook' ?
                <li className= 'navlink' id = 'facebookLogoutButton'>
                    <a href="#" onClick = { this.facebookLogout }>
                        <span className="glyphicon zocial-facebook login-glyph"></span> logout
                    </a>
                </li>
                : null;
            googleLogoutButton = login.user.provider === 'google' ?
                <li>
                    <a id = 'googleLogoutButton' onClick = { this.googleLogout }>
                        <span className="glyphicon zocial-google login-glyph"></span> logout
                    </a>
                </li>
                : null;

            var photo = login.user.photo || null;
            userHomeLink =
                    <li className = { active === 'user' ? 'navlink active' : 'navlink' }>
                        { photo === null ?
                            <a className = 'hidden-xs' href="/user">Home</a>
                            :
                            <a className = 'hidden-xs' href="/user" id = 'profile-pic'><img className = 'img-responsive' src = { photo } /></a>
                        }
                        <a className = 'visible-xs-block' href="/user">Home</a>
                    </li>
        } else {
            facebookLoginButton =
                <li className= 'navlink' id = 'facebookLoginButton'>
                    <a href="#" onClick = { this.facebookLogin }>
                        <span className="glyphicon zocial-facebook login-glyph"></span> login
                    </a>
                </li>
            googleLoginButton =
                <li>
                    <a id = 'googleLoginButton' onClick = { this.googleLogin }>
                        <span className="glyphicon zocial-google login-glyph"></span> login
                    </a>
                </li>
        }

        return (
            <div className="navbar navbar-fixed-top navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                      </button>
                      <span className= { active === 'home' ? 'navlink active' : 'navlink' } id = 'home'><a className="navbar-brand" href="/">Arab Music Research</a></span>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li className= { active === 'discussions' ? 'navlink active' : 'navlink' } id = 'discussions' ><a href="/discussions">Talk</a></li>
                            <li className= { active === 'events' ? 'navlink active' : 'navlink' } id = 'events'><a href="/events">Events</a></li>
                            <li className= { active === 'resources' ? 'navlink active' : 'navlink' } id = 'resources'><a href="/resources">Resource Collections</a></li>
                            <li className= { active === 'notices' ? 'navlink active' : 'navlink' } id = 'notices'><a href="/notices">Notices</a></li>
                            <li className= { active === 'directory' ? 'navlink active' : 'navlink' } id = 'directory'><a href="/directory">Directory</a></li>
                        </ul>
                        <ul id = "loginStuff" className = "nav navbar-nav navbar-right">
							<li className= { active === 'faq' ? 'navlink active' : 'navlink' } id = 'faq'><a href="/faq">FAQ</a></li>
                            <li className= 'navlink' id = 'bug'><a href="mailto:chris.witulski@gmail.com">Report a Bug</a></li>
                            { facebookLoginButton }
                            { facebookLogoutButton }
                            { googleLoginButton }
                            { googleLogoutButton }
                            { userHomeLink }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
})
