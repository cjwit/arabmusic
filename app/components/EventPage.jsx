var React = require('react');
var Event = require('./Event.jsx');
var EventHeader = require('./EventHeader.jsx');
var Navbar = require('./Navbar.jsx');
var Footer = require('./Footer.jsx');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            login: this.props.login
        };
    },

    render: function() {
        var info = this.props.info;

        return (
            <div>
                <Navbar active = 'events' login = { this.state.login } />
                <EventHeader />
                <div className = 'container'>
                    <div className = 'row holder'>
                        <div className = 'col-md-8 col-md-offset-2'>
                            <h1>Event Details</h1>
                            <Event info = { info } />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
});
