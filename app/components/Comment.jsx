var React = require('react');

module.exports = React.createClass({
    render: function() {
        var info = this.props.info;
        console.log(info.content)
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
            </div>
        )
    }
})
