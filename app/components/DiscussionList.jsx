var React = require('react');
var Discussion = require('./Discussion.jsx');

module.exports = React.createClass({
    render: function() {
        var discussionList = [];
        this.props.discussions.sort(function(a, b) {
            return b.date - a.date;
        }).map(function (discussion, index) {
            discussionList.push(<Discussion info = { discussion } key = { index } />)
        });
        console.log('--> rendering DiscussionList with', discussionList)
        return (
            <div className = 'list'>
                { discussionList }
            </div>
        )
    }
})
