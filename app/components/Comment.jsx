var React = require('react');
var postActions = require('../actions/PostActions');

module.exports = React.createClass({
    deleteComment: function(e) {
        e.preventDefault();
        var payload = {
            discussionID: this.props.discussionID,
            comment: this.props.info
        }
        postActions.deleteComment(payload)
    },

    editComment: function(e) {
        e.preventDefault();
        // postActions.editPost(this.props.info)
    },

    render: function() {
        var info = this.props.info;
        info.date = new Date(info.date);
        return (
            <div className = 'comment'>
                <span className = 'comment-author'>
                    { info.author },&nbsp;
                </span>
                <span className = 'comment-date'>
                    { info.date.toLocaleDateString() }:&nbsp;
                </span>
                <span className = 'comment-content'>
                    { info.content }
                </span>
                <div className = 'btn-group pull-right' role = 'group' aria-label='...'>
                    <a onClick = { this.editComment } className = 'btn btn-default'>
                        <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                    </a>
                    <a onClick = { this.deleteComment } className = 'btn btn-default'>
                        <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                    </a>
                </div>

            </div>
        )
    }
})
