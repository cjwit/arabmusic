var React = require('react');
var actions = require('../actions/EventActions');

module.exports = React.createClass({
    deleteEvent: function(e) {
        e.preventDefault();
        actions.deleteEvent(this.props.info)
    },

    editEvent: function(e) {
        e.preventDefault();
        // actions.editEvent(this.props.info)
    },

    render: function() {
        var event = this.props.info;
        return (
            <div className = 'event'>
                <span className = 'event-name'>
                    { event.name }:&nbsp;
                </span>

                { event.place ? <span className = 'event-place'>{ event.place },&nbsp;</span> : null }

                <span className = 'event-date'>
                    { event.date.toLocaleDateString() }
                </span>
                <div className = 'btn-group pull-right' role = 'group' aria-label='...'>
                    <button onClick = { this.editEvent } type = 'button' className = 'btn btn-default'>
                        <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                    </button>
                    <button onClick = { this.deleteEvent } type = 'button' className = 'btn btn-default'>
                        <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                    </button>
                </div>
                <br />

                <div className = 'event-description'>
                    { event.description }
                </div>
            </div>
            )
    }
})
