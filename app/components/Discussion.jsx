var React = require('react');
var Comment = require('./Comment.jsx');
var postActions = require('../actions/PostActions');

module.exports = React.createClass({
    deletePost: function(e) {
        e.preventDefault();
        postActions.deletePost(this.props.info)

        // redirect if on detail page
        var path = window.location.pathname;
        var split = path.split('/')
        var folder = split[1]
        var id = split[2] || null
        if (id != null) {
            window.location.href = '/' + folder;
        }
    },

    editPost: function(e) {
        e.preventDefault();
        // postActions.editPost(this.props.info)
    },

    render: function() {
        var info = this.props.info;
        var id = info._id;
        var discussionPage = Boolean(window.location.pathname.match(/^\/discussions\//));

        var comments = [];
        if (info.comments.length > 0) {
            info.comments.forEach(function(c, index) {
                comments.push(<Comment info = { c.comment } discussionID = { id } key = { 'comment' + index }/>)
            });
        }

        return (
            <div className = 'discussion' id = { id }>
                <span className = 'discussion-title'>
                    { info.title }:&nbsp;
                </span>
                { !discussionPage ?
                    <div className = 'btn-group pull-right' role = 'group' aria-label='...'>
                        <a href= { 'discussions/' + id } className = 'btn btn-default'>
                            <span className="glyphicon glyphicon-zoom-in" aria-hidden="true"></span>
                        </a>
                    </div>
                        :
                    <div className = 'btn-group pull-right' role = 'group' aria-label='...'>
                        <a onClick = { this.editPost } className = 'btn btn-default'>
                            <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                        </a>
                        <a onClick = { this.deletePost } className = 'btn btn-default'>
                            <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        </a>
                    </div>
                }
                <p>
                    <span className = 'discussion-author'>
                        { info.author },&nbsp;
                    </span>
                    <span className = 'discussion-date'>
                        { info.date.toLocaleDateString() }
                    </span>
                </p>
                <div className = 'discussion-content'>
                    { info.content }
                </div>

                { comments }
            </div>
        )
    }
})
