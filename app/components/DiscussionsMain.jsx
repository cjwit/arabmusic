var React = require('react');
var DiscussionList = require('./DiscussionList.jsx');
var PostForm = require('./PostForm.jsx');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            loggedIn: this.props.login
        };
    },

    render: function() {
        var discussions = this.props.discussions;
        console.log('Discussions')

        return (
            <div>
                <div id = 'head' className = 'row'>
                    <div className = 'col-md-8 col-md-offset-2 holder'>
                        <h1>Questions and Answers</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                </div>

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

            </div>
        )
    }
});
