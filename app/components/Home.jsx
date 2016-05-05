var React = require('react');
var About = require('./About.jsx');
var EventList = require('./EventList.jsx');
var DiscussionList = require('./DiscussionList.jsx');
var Navbar = require('./Navbar.jsx');
var Footer = require('./Footer.jsx');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            login: this.props.login
        }
    },

    render: function() {
        var today = new Date(Date.now());
        var events = this.props.events.filter(function(event) {
            return event.date >= today || event.date.toDateString() == today.toDateString();
        }).sort(function(a, b) {
            return a.date - b.date;
        });

        var discussions = this.props.discussions.sort(function(a, b) {
            return b.date - a.date;
        })

        var login = this.state.login;

        return (
            <div>
                <Navbar active = 'home' login = { this.state.login }/>
                <About />
                <div className = 'container'>
                    <div className = 'row'>
                        <div className = 'col-md-6'>
                            <div className = 'holder'>
                                <h1>Recent Activity</h1>
                                <DiscussionList discussions = { discussions } login = { login } />
                            </div>
                        </div>
                        <div className = 'col-md-6'>
                            <div className = 'holder'>
                                <h1>Upcoming Arab Music Events</h1>
                                <EventList events = { events } login = { login } />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />

            </div>
        )
    }
});
