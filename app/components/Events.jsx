var React = require('react');
var EventList = require('./EventList.jsx');
var EventForm = require('./EventForm.jsx');
var EventHeader = require('./EventHeader.jsx');
var Navbar = require('./Navbar.jsx');
var Footer = require('./Footer.jsx');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            showForm: false
        };
    },

    componentWillReceiveProps: function() {
        this.setState({ showForm: false })
    },

    toggleForm: function() {
        this.setState({ showForm: !this.state.showForm })
        return;
    },

    render: function() {
        var events = this.props.events;

        var today = new Date(Date.now());
        var upcoming = events.filter(function(event) {
            return event.date >= today || event.date.toDateString() == today.toDateString();
        }).sort(function(a, b) {
            return a.date - b.date;
        })
        var past = events.filter(function(event) {
            return event.date < today && event.date.toDateString() !== today.toDateString();
        }).sort(function(a, b) {
            return b.date - a.date;
        })

        var login = this.props.login;

        return (
            <div>
                <Navbar active = 'events' login = { login }/>
                <EventHeader />

                { login ?
                    <div className = 'holder text-center'>
                        <button id = 'addEventFormToggle'
                            className = 'btn btn-default'
                            onClick = { this.toggleForm } >Add an Event
                        </button>
                    </div> :
                    <div className = 'holder'>
                        <p className = 'text-center'>
                            Login to add an event
                        </p>
                    </div>
                }

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
                <Footer />
            </div>
        )
    }
});
