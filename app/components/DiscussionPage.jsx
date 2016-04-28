var React = require('react');
var DiscussionHeader = require('./DiscussionHeader.jsx');
var DiscussionList = require('./DiscussionList.jsx');
var CommentForm = require('./CommentForm.jsx');
var Discussion = require('./Discussion.jsx');
var Navbar = require('./Navbar.jsx');
var Footer = require('./Footer.jsx');

module.exports = React.createClass({
    render: function() {
        var info = this.props.info;
        var login = this.props.login;
        return (
            <div>
                <Navbar active = 'discussions' login = { login } />
                <DiscussionHeader />
                <div className = 'container'>
                    <div className = 'row holder'>
                        <div className = 'col-md-8'>
                            <h1>Post Details</h1>
                            <Discussion info = { info } login = { login } />
                        </div>
                        <div className = 'col-md-4'>
                            <h1 className = 'spacer'>&nbsp;</h1>
                            <div id = "addCommentContainer">
                                <CommentForm info = { info } login = { login } />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
});
