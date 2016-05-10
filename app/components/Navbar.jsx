var React = require('react');
var actions = require('../actions/loginActions');

module.exports = React.createClass({
    componentDidMount: function() {
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '503327943125203',
                cookie     : true,
                xfbml      : true,
                version    : 'v2.6'
            });

            FB.getLoginStatus(function(response) {
                this.statusChangeCallback(response);
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
        // response object is name, ID, email, picture (at response.picture.data.url)..
        // this could be how to connect to the database
        console.log('\nSuccessful login for', response.name);
        console.log(response);
        var loginObject = {
            name: response.name,
            id: response.id,
            email: response.email,
            photo: response.picture.data.url
        }
        console.log(loginObject);
        actions.login(loginObject);
    },

    // use this functionality to inform the application who the user is
    // perhaps this API call could be the element that is moved elsewhere (service?)
    // use this to send info through the application
    statusChangeCallback: function(response) {
        console.log('\nstatusChangeCallback called');
        console.log(response);
        var photo;
        if (response.status === 'connected') {
            FB.api('/me', { fields: 'name,email,picture' }, this.apiCallback);
        } else {
            actions.logout();
        }
    },

    checkLoginState: function() {
        FB.getLoginStatus(function(response) {
            this.statusChangeCallback(response);
        }.bind(this));
    },

    login: function() {
        FB.login(this.checkLoginState(), { scope: 'email,public_profile' });
    },

    logout: function() {
        FB.logout(this.checkLoginState());
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
        console.log(login);

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
                        <li className= { active === 'directory' ? 'navlink active' : 'navlink' } id = 'directory'><a href="/directory">Directory</a></li>
                        <li className= { active === 'samr' ? 'navlink active' : 'navlink' } id = 'samr'><a href="/samr">SAMR</a></li>
                    </ul>
                    <ul className = "nav navbar-nav navbar-right">
                        <li className= 'navlink' id = 'login'><a href="#" onClick = { login.status ? this.logout : this.login }>{ login.status ? 'Log Out' : 'Log In (FB)' }</a></li>
                        { login.status ?
                            <li className= { active === 'user' ? 'navlink active' : 'navlink' }>
                                <a href="/user" id = 'status'>
                                    { photo === null ? 'Home' : <img className = 'profile-pic' src = { photo } /> }
                                </a>
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
