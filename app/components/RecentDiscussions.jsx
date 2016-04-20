var React = require('react');
var Discussion = require('./Discussion.jsx');

module.exports = React.createClass({
    render: function() {
        var discussionList = [];
        this.props.discussions.map(function (discussion, index) {
            discussionList.push(<Discussion info = { discussion } key = { "discussion" + index } />)
        });

        return (
            <div className = 'holder'>
                <h1>Recent Activity</h1>
                { discussionList }
            </div>
        )
    }
})
