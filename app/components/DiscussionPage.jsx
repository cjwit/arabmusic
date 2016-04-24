var React = require('react');
var DiscussionList = require('./DiscussionList.jsx');
var CommentForm = require('./CommentForm.jsx');
var Discussion = require('./Discussion.jsx');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            loggedIn: this.props.login
        };
    },

    render: function() {
        var info = this.props.info;
        var id = info.author + info.date.getTime()

        return (
            <div>
                <div className = 'container'>
                    <div className = 'row holder'>
                        <div className = 'col-md-8'>
                            <h1>Recent Posts</h1>
                            <Discussion info = { info } />
                        </div>
                        <div className = 'col-md-4'>
                            <h1 className = 'spacer'>&nbsp;</h1>
                            <div id = "addCommentContainer">
                                <CommentForm id = { id } info = { info } login = { this.props.login } />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
