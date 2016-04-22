var React = require('react');
var About = require('./About.jsx');
var EventList = require('./EventList.jsx');
var DiscussionList = require('./DiscussionList.jsx');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            loggedIn: this.props.login
        }
    },

    render: function() {
        var events = this.props.events.filter(function(event) {
            return moment(event.date).isSameOrAfter(new Date(Date.now()));
        }).splice(0, 5);

        return (
            <div>
                <div id = 'head' className = 'row'>
                    <div className = 'col-md-8 col-md-offset-2'>
                        <About />
                    </div>
                </div>
                <div className = 'container'>
                    <div className = 'row'>
                        <div className = 'col-md-6'>
                            <div className = 'holder'>
                                <h1>Recent Activity</h1>
                                <DiscussionList discussions = { this.props.discussions } />
                            </div>
                        </div>
                        <div className = 'col-md-6'>
                            <div className = 'holder'>
                                <h1>Upcoming Arabic Music Events</h1>
                                    <EventList events = { events } />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
});
