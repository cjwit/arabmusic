var React = require('react');
var EventList = require('./EventList.jsx');
var DiscussionList = require('./DiscussionList.jsx');
var ResourceList = require('./ResourceList.jsx');
var NoticeList = require('./NoticeList.jsx');
var Navbar = require('./Navbar.jsx');
var Footer = require('./Footer.jsx');

module.exports = React.createClass({
    render: function() {
        var login = this.props.login,
            events = this.props.events,
            resources = this.props.resources;

        var userEvents = [],
            userResources = [];

        var name, email, id;

        if (login.status === true) {
            name = login.user.name;
            email = login.user.email;
            id = login.user._id;

            userEvents = events.filter(function(e) {
                return e.owner === id;
            })
            userResources = resources.filter(function(r) {
                var mine = false;
                if (r.owner === id) { mine = true }
                r.items.forEach(function(i) {
                    if (i.item.owner === id) {
                        mine = true;
                    }
                })
                return mine;
            })
        }

        return (
            <div>
                <Navbar active = 'user' login = { login }/>
                <div className = 'container'>
                    <div className = 'row'>
                        <div className = 'col-md-6'>
                            <div className = 'holder'>
                                <h1>My Information</h1>
                                <ul>
                                    <li>Name: { name }</li>
                                    <li>Email: { email }</li>
                                    <li>ID: { id }</li>
                                </ul>
                                <p>
                                    Ways to edit my info
                                </p>
                            </div>
                        </div>
                        <div className = 'col-md-6'>
                            <div className = 'holder'>
                                <h1>My Posts and Comments</h1>
                            </div>
                            <div className = 'holder'>
                                <h1>My Events</h1>
                                <EventList login = { login } events = { userEvents }/>
                            </div>
                            <div className = 'holder'>
                                <h1>My Notices</h1>
                            </div>
                            <div className = 'holder'>
                                <h1>My Collections and Item Contributions</h1>
                                <ResourceList login = { login } resources = { userResources }/>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />

            </div>
        )
    }
});
