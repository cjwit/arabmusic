var React = require('react');
var Comment = require('./Comment.jsx');
var postActions = require('../actions/PostActions');

module.exports = React.createClass({
    getInitialState: function() {
        return ({
            id: this.props.info.author + this.props.info.date.getTime()
        })
    },

    deletePost: function(e) {
        e.preventDefault();
        postActions.deletePost(this.props.info)
    },

    editPost: function(e) {
        e.preventDefault();
        // postActions.editPost(this.props.info)
    },

    render: function() {
        var info = this.props.info;
        var comments = [];
        info.comments.sort(function(a, b) {
            return b.date.getTime() - a.date.getTime();
        }).map(function(comment, index) {
            comments.push(<Comment info = { comment } key = { index } />)
        });

        return (
            <div className = 'discussion' id = { this.state.id }>
                <span className = 'discussion-title'>
                    { info.title }:&nbsp;
                </span>
                <div className = 'btn-group pull-right' role = 'group' aria-label='...'>
                    <button type = 'button' className = 'btn btn-default'>
                        <a href= { 'discussions/' + this.state.id }>
                            <span className="glyphicon glyphicon-zoom-in" aria-hidden="true"></span>
                        </a>
                    </button>
                    <button onClick = { this.editPost } type = 'button' className = 'btn btn-default'>
                        <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                    </button>
                    <button onClick = { this.deletePost } type = 'button' className = 'btn btn-default'>
                        <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                    </button>
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
