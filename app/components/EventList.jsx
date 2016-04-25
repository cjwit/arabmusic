var React = require('react');
var Event = require('./Event.jsx');

module.exports = React.createClass({
    render: function() {
        console.log('... rendering EventList')
        var eventList = [];
        this.props.events.map(function (event, index) {
            console.log('from EventList:', event);
            eventList.push(<Event info = { event } key = { "event" + index } />)
        });
        return (
            <div className = 'list'>
                { eventList }
            </div>
        )
    }
})
