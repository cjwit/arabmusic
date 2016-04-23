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

        // LOSING CONTENT HERE! 
        this.props.discussions.forEach(function(post) {
            post.comments.forEach(function(comment) {
                if (comment.author === "Tester's Big Brother") {
                    console.log('from Page')
                    console.log(comment.content);
                }
            })
        })

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
                body = <div className = 'holder'>This page is not yet set up.</div>

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
