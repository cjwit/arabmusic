var React = require('react');
var Event = require('./Event.jsx');

module.exports = React.createClass({
    getInitialState: function() {
        return ({
            listings: 5,
            startIndex: 0
        })
    },

    componentDidMount: function() {
        $("#previousPage").addClass("disabled");
    },

    previous: function() {
        var previous = $("#previousPage"),
            next = $("#nextPage"),
            startIndex = this.state.startIndex,
            listings = this.state.listings;

        startIndex -= listings;
        if (startIndex < 0) { startIndex = 0; }
        this.setState({ startIndex: startIndex })

        next.removeClass("disabled")
        if (startIndex === 0) {
            previous.addClass("disabled");
        } else {
            next.removeClass("disabled");
        }
    },

    next: function() {
        var previous = $("#previousPage"),
            next = $("#nextPage"),
            startIndex = this.state.startIndex,
            listings = this.state.listings;

        startIndex += listings;
        this.setState({ startIndex: startIndex })

        previous.removeClass("disabled")
        if (startIndex + listings >= this.props.events.length) {
            next.addClass("disabled");
        } else {
            next.removeClass("disabled");
        }
    },

    render: function() {
        var incomingListings = this.props.events,
            incomingLength = incomingListings.length,
            startIndex = this.state.startIndex,
            endIndex = startIndex + this.state.listings;

        var events = incomingListings.slice(startIndex, endIndex);

        var eventList = [];
        events.map(function (event, index) {
            eventList.push(<Event info = { event } key = { "event" + index } />)
        });
        return (
            <div className = 'list'>
                { eventList }
                {
                    incomingLength > this.state.listings ?
                    <nav>
                      <ul className="pager">
                        <li className = "disabled" id = "previousPage"><a onClick = { this.previous }>Previous</a></li>
                        1 of 3
                        <li id = "nextPage"><a onClick = { this.next }>Next</a></li>
                      </ul>
                    </nav>
                    : null
                }
            </div>
        )
    }
})
