var React = require('react');
var UserInfo = require('./UserInfo.jsx');
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
            resources = this.props.resources,
            discussions = this.props.discussions,
            notices = this.props.notices;

        var userEvents = [],
            userNotices = [],
            userDiscussions = [],
            userResources = [];

        var name, email, id;

        if (login.status === true) {
            name = login.user.name;
            email = login.user.email;
            id = login.user._id;

            userEvents = events.filter(function(e) {
                return e.owner === id;
            })
            userNotices = notices.filter(function(n) {
                return n.owner === id;
            })
            userDiscussions = discussions.filter(function(p) {
                var myPost = false;
                if (p.owner === id) {
                    myPost = true;
                }
                p.comments.map(function(c) {
                    if (c.comment.owner === id) {
                        myPost = true;
                    }
                })
                return myPost;
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
                        <div className = 'col-md-4'>
                            <div className = 'holder'>
                                <h1>My Information</h1>
                                {
                                    login.status ?
                                        <UserInfo login = { login } />
                                        :
                                        <div>
                                            <p>Loading...</p>
                                            <p>If your information does not appear shortly, you may not be logged in. Try reloading the page or logging in again.</p>
                                        </div>
                                }
                            </div>
                        </div>
                        <div className = 'col-md-8'>
                            <div className = 'holder'>
                                <h1>My Posts and Comments</h1>
                                <DiscussionList login = { login } discussions = { userDiscussions }/>
                            </div>
                            <div className = 'holder'>
                                <h1>My Events</h1>
                                <EventList login = { login } events = { userEvents }/>
                            </div>
                            <div className = 'holder'>
                                <h1>My Notices</h1>
                                <NoticeList login = { login } notices = { userNotices }/>
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
