var React = require('react');

module.exports = React.createClass({
    render: function() {
        var active = this.props.active;
        var login = this.props.login;
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
                      <span className= { active === 'home' ? 'navlink active' : 'navlink' } id = 'home'><a className="navbar-brand" href="/">Arabic Music Research</a></span>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                      <ul className="nav navbar-nav">
                        <li className= { active === 'discussions' ? 'navlink active' : 'navlink' } id = 'discussions' ><a href="/discussions">Talk</a></li>
                        <li className= { active === 'events' ? 'navlink active' : 'navlink' } id = 'events'><a href="/events">Events</a></li>
                        <li className= { active === 'resources' ? 'navlink active' : 'navlink' } id = 'resources'><a href="/resources">Resources</a></li>
                        <li className= { active === 'samr' ? 'navlink active' : 'navlink' } id = 'samr'><a href="/samr">SAMR</a></li>
                        <li className= { active === 'login' ? 'navlink active' : 'navlink' } id = 'login'><a href="/login">{ login ? 'Log Out' : 'Sign Up / Login' }</a></li>
                      </ul>
                    </div>
                </div>
            </div>
        )
    }
})
