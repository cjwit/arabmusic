var React = require('react');
var Comment = require('./Comment.jsx');
var actions = require('../actions/PostActions');

module.exports = React.createClass({
    deletePost: function(e) {
        e.preventDefault();
        actions.deletePost(this.props.info)
    },

    render: function() {
        var info = this.props.info;
        var comments = [];
        info.comments.sort(function(a, b) {
            return b.date - a.date;
        }).map(function(comment, index) {
            comments.push(<Comment info = { comment } key = { index } />)
        });

        return (
            <div className = 'discussion'>
                <span className = 'discussion-title'>
                    { info.title }:&nbsp;
                </span>
                <span className = 'pull-right text-uppercase delete-button'
                      onClick = { this.deletePost }>
                    &times;
                </span>
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
