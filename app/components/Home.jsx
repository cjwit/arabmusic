var React = require('react');
var About = require('./About.jsx');
var UpcomingEvents = require('./UpcomingEvents.jsx');
var RecentDiscussions = require('./RecentDiscussions.jsx');

module.exports = React.createClass({
    render: function() {
        return (
            <div className = 'row'>
                <div className = 'col-md-8 col-md-offset-2'>
                    <About />
                </div>
            </div>

            <div className = 'row'>
                <div className = 'col-md-6'>
                    <RecentDiscussions discussions = { this.props.discussions } />
                </div>
                <div className = 'col-md-6'>
                    <UpcomingEvents events = { this.props.events } />
                </div>
            </div>
        )
    }
});
