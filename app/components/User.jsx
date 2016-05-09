var React = require('react');
var EventList = require('./EventList.jsx');
var DiscussionList = require('./DiscussionList.jsx');
var ResourceList = require('./ResourceList.jsx');
var NoticeList = require('./NoticeList.jsx');
var Navbar = require('./Navbar.jsx');
var Footer = require('./Footer.jsx');

module.exports = React.createClass({
    render: function() {
        var login = this.props.login;
        return (
            <div>
                <Navbar active = 'user' login = { login }/>
                <div className = 'container'>
                    <div className = 'row'>
                        <div className = 'col-md-6'>
                            <div className = 'holder'>
                                <h1>Edit My Information</h1>
                                <p>
                                    <a href="/auth/facebook">Login with Facebook (Passport.js)</a>
                                </p>
                                <p>
                                    <a href="/logout">Log Out</a>
                                </p>
                            </div>
                        </div>
                        <div className = 'col-md-6'>
                            <div className = 'holder'>
                                <h1>My Posts and Comments</h1>
                            </div>
                            <div className = 'holder'>
                                <h1>My Events</h1>
                            </div>
                            <div className = 'holder'>
                                <h1>My Notices</h1>
                            </div>
                            <div className = 'holder'>
                                <h1>My Collections and Items</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />

            </div>
        )
    }
});
