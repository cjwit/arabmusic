var React = require('react');
var actions = require('../actions/PageActions.js');

module.exports = React.createClass({
    onClick: function(e) {
        e.preventDefault();
        var newTarget = {
            page: e.target.parentElement.id,
            content: null
        }
        actions.changePage(newTarget);
    },

    render: function() {
        var active = this.props.active;
        console.log(active);
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
                      <span className= { active === 'home' ? 'navlink active' : 'navlink' } id = 'home' onClick = { this.onClick }><a className="navbar-brand" href="#">Arabic Music Research</a></span>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                      <ul className="nav navbar-nav">
                        <li className= { active === 'discussions' ? 'navlink active' : 'navlink' } id = 'discussions' onClick = { this.onClick }><a href="#">Talk</a></li>
                        <li className= { active === 'events' ? 'navlink active' : 'navlink' } id = 'events' onClick = { this.onClick }><a href="#">Events</a></li>
                        <li className= { active === 'news' ? 'navlink active' : 'navlink' } id = 'news' onClick = { this.onClick }><a href="#">News</a></li>
                        <li className= { active === 'resources' ? 'navlink active' : 'navlink' } id = 'resources' onClick = { this.onClick }><a href="#">Resources</a></li>
                        <li className= { active === 'login' ? 'navlink active' : 'navlink' } id = 'login' onClick = { this.onClick }><a href="#">Sign Up / Login</a></li>
                      </ul>
                    </div>
                </div>
            </div>
            )
    }
})
