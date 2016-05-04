var React = require('react');
var Notice = require('./Notice.jsx');

module.exports = React.createClass({
    render: function() {
        var noticeList = [];
        this.props.notices.sort(function(a, b) {
            return b.date - a.date;
        }).map(function (notice, index) {
            noticeList.push(<Notice info = { notice } key = { 'notice' + index } />)
        });
        return (
            <div className = 'list'>
                { noticeList }
            </div>
        )
    }
})
