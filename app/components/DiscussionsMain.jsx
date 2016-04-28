var React = require('react');
var DiscussionHeader = require('./DiscussionHeader.jsx');
var DiscussionList = require('./DiscussionList.jsx');
var PostForm = require('./PostForm.jsx');
var Navbar = require('./Navbar.jsx');
var Footer = require('./Footer.jsx');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            login: this.props.login
        };
    },

    render: function() {
        var discussions = this.props.discussions;
        return (
            <div>
                <Navbar active = 'discussions' login = { this.state.login }/>
                <DiscussionHeader />
                <div id = 'subContainer' className = 'container'>
                    <div className = 'row holder'>
                        <div className = 'col-md-4'>
                            <h1 className = 'spacer'>&nbsp;</h1>
                            <div id = "addPostContainer">
                                <PostForm login = { this.props.login } />
                            </div>

                        </div>
                        <div className = 'col-md-8'>
                            <h1>Recent Posts</h1>
                            <DiscussionList discussions = { discussions } />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
});
