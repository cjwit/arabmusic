var React = require('react');
var actions = require('../actions/PageActions.js');

module.exports = React.createClass({
    onClick: function(e) {
        var newTarget = {
            page: e.target.parentElement.id,
            content: null
        }
        console.log('from Navbar, sending newTarget to actions, newTarget.page: ', newTarget.page, 'content: ', newTarget.content)
        actions.changePage(newTarget);
    },

    render: function() {
        var target = this.props.target;
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
                      <span className='navlink' id = 'home' onClick = { this.onClick }><a className="navbar-brand" href="#">Arabic Music Research</a></span>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                      <ul className="nav navbar-nav">
                        <li className='navlink' id = 'discussions' onClick = { this.onClick }><a href="#">Talk</a></li>
                        <li className='navlink' id = 'events' onClick = { this.onClick }><a href="#">Events</a></li>
                        <li className='navlink' id = 'news' onClick = { this.onClick }><a href="#">News</a></li>
                        <li className='navlink' id = 'resources' onClick = { this.onClick }><a href="#">Resources</a></li>
                        <li className='navlink' id = 'login' onClick = { this.onClick }><a href="#">Sign Up / Login</a></li>
                      </ul>
                    </div>
                </div>
            </div>
            )
    }
})
