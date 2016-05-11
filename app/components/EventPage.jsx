var React = require('react');
var Event = require('./Event.jsx');
var EventHeader = require('./EventHeader.jsx');
var Navbar = require('./Navbar.jsx');
var Footer = require('./Footer.jsx');

module.exports = React.createClass({
    render: function() {
        var info = this.props.info;
        var login = this.props.login;

        console.log('eventPage', login);

        return (
            <div>
                <Navbar active = 'events' login = { login } />
                <EventHeader />
                <div className = 'container'>
                    <div className = 'row holder'>
                        <div className = 'col-md-8 col-md-offset-2'>
                            <h1>Event Details</h1>
                            <Event info = { info } login = { login }/>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
});
