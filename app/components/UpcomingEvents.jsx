var React = require('react');
var Event = require('./Event.jsx');

module.exports = React.createClass({
    render: function() {
        var eventList = [];
        this.props.events.map(function (event, index) {
            eventList.push(<Event info = { event } key = { "event" + index } />)
        });

        return (
            <div className = 'holder'>
                <h1>Upcoming Arabic Music Events</h1>
                { eventList }
            </div>
            )
    }
})
