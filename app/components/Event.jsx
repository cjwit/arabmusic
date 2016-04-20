var React = require('react');

module.exports = React.createClass({
    render: function() {
        var event = this.props.info;
        return (
            <div>
                <span className = 'event-name'>
                    { event.name }:&nbsp;
                </span>
                <span className = 'event-place'>
                    { event.place },&nbsp;
                </span>
                <span className = 'event-date'>
                    { event.date.toLocaleDateString() }
                </span><br />

                <div className = 'event-description'>
                    { event.description }
                </div>
                <span className = 'event-contact'>
                    For more information: { event.contact }
                </span>

            </div>
            )
    }
})
