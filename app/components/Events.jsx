var React = require('react');
var EventList = require('./EventList.jsx');
var EventForm = require('./EventForm.jsx');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            showForm: false,
            loggedIn: this.props.login
        };
    },

    toggleForm: function() {
        this.setState({ showForm: !this.state.showForm })
        return;
    },

    render: function() {
        var events = this.props.events;
        var today = new Date(Date.now());
        var upcoming = events.filter(function(event) {
            return event.date > today;
        })
        var past = events.filter(function(event) {
            return event.date < today;
        })
        return (
            <div>
                <div id = 'head' className = 'row'>
                    <div className = 'col-md-8 col-md-offset-2 holder'>
                        <h1>Arab Music Events</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                        { this.state.loggedIn ?
                            <button id = 'addEventFormToggle'
                                className = 'btn btn-default'
                                onClick = { this.toggleForm } >Add an Event
                            </button> :
                            <p className = 'pull-right'>
                                Login to add an event
                            </p>
                        }

                    </div>
                </div>

                { this.state.showForm ? <EventForm /> : null }

                <div id = 'currentEvents' className = 'container'>
                    <div className = 'row'>
                        <div className = 'col-md-6'>
                            <div className = 'holder'>
                                <h1>Upcoming Events</h1>
                                <EventList events = { upcoming } />
                            </div>
                        </div>
                        <div className = 'col-md-6'>
                            <div className = 'holder'>
                                <h1>Past Events</h1>
                                <EventList events = { past } />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
});
