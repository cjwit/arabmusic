var React = require('react');
var About = require('./About.jsx');
var UpcomingEvents = require('./UpcomingEvents.jsx');

module.exports = React.createClass({
    render: function() {
        return (
            <div className = 'row'>
                <div className = 'col-md-6'>
                    <About />
                </div>
                <div className = 'col-md-6'>
                    <UpcomingEvents events = { this.props.events } />
                </div>
            </div>
        )
    }
});
