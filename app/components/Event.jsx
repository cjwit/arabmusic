var React = require('react');
var actions = require('../actions/EventActions');

module.exports = React.createClass({
    deleteEvent: function(e) {
        e.preventDefault();
        actions.deleteEvent(this.props.info)
    },

    render: function() {
        var event = this.props.info;
        return (
            <div>
                <span className = 'event-name'>
                    { event.name }:&nbsp;
                </span>

                { event.place ? <span className = 'event-place'>{ event.place },&nbsp;</span> : null }

                <span className = 'event-date'>
                    { event.date.toLocaleDateString() }
                </span>
                <span className = 'pull-right text-uppercase delete-button'
                      onClick = { this.deleteEvent }>
                    &times;
                </span>
                <br />

                <div className = 'event-description'>
                    { event.description }
                </div>

                { event.contact ? <span className = 'event-contact'>For more information: { event.contact }</span> : null }
            </div>
            )
    }
})
