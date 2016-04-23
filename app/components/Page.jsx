var React = require('react');
var Events = require('./Events.jsx');
var Home = require('./Home.jsx');
var Discussions = require('./Discussions.jsx');
var DiscussionPage = require('./DiscussionPage.jsx');
var Navbar = require('./Navbar.jsx');
var Footer = require('./Footer.jsx');

module.exports = React.createClass({
    render: function() {
        var body;
        var login = this.props.login;
        var events = this.props.events;
        var discussions = this.props.discussions;
        var target = this.props.target;
        switch (this.props.target.page) {
            case "home":
                body = <Home events = { events } discussions = { discussions } login = { login } />;
                break;
            case "events":
                body = <Events events = { events } login = { login }/>;
                break;
            case "discussions":
                body = <Discussions discussions = { discussions } login = { login }/>;
                break;
            case "openDiscussion":
                body = <DiscussionPage info = { target.content } login = { login }/>;
                target.page = 'discussions';
                break;
            default:
                console.log('page is not set up yet')

        }

        return (
            <div>
                <div>
                    <Navbar active = { target.page } />
                </div>
                <div>
                    { body }
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        )
    }
});
