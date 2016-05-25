var React = require('react');
var actions = require('../actions/loginActions');

module.exports = React.createClass({
    componentDidMount: function() {
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '509714599153204', // local version
                // appId      : '503327943125203', // deployed version
                cookie     : true,
                xfbml      : true,
                version    : 'v2.6'
            });

            FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                    this.loginCallback(response)
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

    apiCallback: function(response) {
        var loginObject = {
            name: response.name,
            id: response.id,
            email: response.email,
            photo: response.picture.data.url
        }
        actions.login(loginObject);
    },

    loginCallback: function(response) {
        if (response.authResponse) {
            FB.api('/me', { fields: 'name,email,picture' }, this.apiCallback);
        } else {
            console.log('FB login failed or cancelled');
        }
    },

    login: function() {
        FB.login(this.loginCallback, { scope: 'email,public_profile' });
    },

    logout: function() {
        FB.logout(actions.logout());
    },

    onSignIn: function(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
    },

    render: function() {
        var active = this.props.active;
        var login = this.props.login;
        var photo;

        if (login.status === false) {
            photo = null;
        } else {
            photo = login.user.photo;
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
                        <li className= { active === 'resources' ? 'navlink active' : 'navlink' } id = 'resources'><a href="/resources">Resources and Notices</a></li>
                        <li className= { active === 'directory' ? 'navlink active' : 'navlink' } id = 'directory'><a href="/directory">Directory (not yet built)</a></li>
                    </ul>
                    <ul className = "nav navbar-nav navbar-right">

                        <li className= 'navlink' id = 'login'>
                            <a href="#" onClick = { login.status ? this.logout : this.login }>
                                <span className="glyphicon zocial-facebook login-glyph"></span> { login.status ? 'logout' : 'login' }
                            </a>
                        </li>
                        <li>
                            <div className="g-signin2" data-onsuccess="onSignIn"></div>
                        </li>

                        { login.status ?
                            <li className = { active === 'user' ? 'navlink active' : 'navlink' }>
                                { photo === null ?
                                    <a className = 'hidden-xs' href="/user">Home</a>
                                    :
                                    <a className = 'hidden-xs' href="/user" id = 'profile-pic'><img src = { photo } /></a>
                                }
                                <a className = 'visible-xs-block' href="/user">Home</a>
                            </li>
                            :
                            null
                        }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
})
