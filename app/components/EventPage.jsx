var React = require('react');
var Event = require('./Event.jsx');
var Navbar = require('./Navbar.jsx');
var Footer = require('./Footer.jsx');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            loggedIn: this.props.login
        };
    },

    render: function() {
        var info = this.props.info;
        var id = info.name + info.date.getTime()

        return (
            <div>
                <div id = 'head' className = 'row'>
                    <div className = 'col-md-8 col-md-offset-2 holder'>
                        <h1>Arab Music Events</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                </div>
                <div className = 'container'>
                    <div className = 'row holder'>
                        <div className = 'col-md-8 col-md-offset-2'>
                            <h1>Event Details</h1>
                            <Event info = { info } />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
