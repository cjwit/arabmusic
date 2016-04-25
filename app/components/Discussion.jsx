var React = require('react');
var Comment = require('./Comment.jsx');
var postActions = require('../actions/PostActions');

module.exports = React.createClass({
    deletePost: function(e) {
        e.preventDefault();
        postActions.deletePost(this.props.info)
        window.location.href = '/discussions.html';
    },

    editPost: function(e) {
        e.preventDefault();
        // postActions.editPost(this.props.info)
    },

    render: function() {
        var info = this.props.info;
        var id = info._id;
        var comments = [];
        info.comments.sort(function(a, b) {
            return b.date.getTime() - a.date.getTime();
        }).map(function(comment, index) {
            comments.push(<Comment info = { comment } key = { index } />)
        });
        var discussionPage = Boolean(window.location.pathname.match(/^\/discussions\//));

        return (
            <div className = 'discussion' id = { id }>
                <span className = 'discussion-title'>
                    { info.title }:&nbsp;
                </span>
                <div className = 'btn-group pull-right' role = 'group' aria-label='...'>
                    { !discussionPage ?
                        <a href= { 'discussions/' + id } className = 'btn btn-default'>
                            <span className="glyphicon glyphicon-zoom-in" aria-hidden="true"></span>
                        </a>
                        : null
                    }
                    <a onClick = { this.editPost } className = 'btn btn-default'>
                        <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                    </a>
                    <a onClick = { this.deletePost } className = 'btn btn-default'>
                        <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                    </a>
                </div>
                <br />
                <span className = 'discussion-author'>
                    { info.author },&nbsp;
                </span>
                <span className = 'discussion-date'>
                    { info.date.toLocaleDateString() }
                </span><br />
                <div className = 'discussion-content'>
                    { info.content }
                </div>

                { comments }

            </div>
        )
    }
})
