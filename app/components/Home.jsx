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
        var events = this.props.events.filter(function(event) {
            return moment(event.date).isSameOrAfter(new Date(Date.now()));
        }).sort(function(a, b) {
            return a.date - b.date;
        }).splice(0, 5);
        var login = this.state.login;

        return (
            <div>
                <Navbar active = 'home' login = { this.state.login }/>
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
                                <DiscussionList discussions = { this.props.discussions } login = { login } />
                            </div>
                        </div>
                        <div className = 'col-md-6'>
                            <div className = 'holder'>
                                <h1>Upcoming Arabic Music Events</h1>
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
