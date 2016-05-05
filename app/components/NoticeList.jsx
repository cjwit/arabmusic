var React = require('react');
var Notice = require('./Notice.jsx');

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
        var incomingListings = this.props.notices,
            incomingLength = incomingListings.length,
            startIndex = this.state.startIndex,
            endIndex = startIndex + this.state.listings,
            currentPage = startIndex / this.state.listings + 1,
            totalPages = Math.floor(incomingLength / this.state.listings) + 1;

        var notices = incomingListings.slice(startIndex, endIndex);

        var noticeList = [];

        // move this sort
        notices.sort(function(a, b) {
            return b.date - a.date;
        }).map(function (notice, index) {
            noticeList.push(<Notice info = { notice } key = { 'notice' + index } />)
        });
        return (
            <div className = 'list'>
                { noticeList }
                {
                    incomingLength > this.state.listings ?
                    <nav>
                      <ul className="pager">
                        <li className = "disabled" id = "previousPage"><a onClick = { this.previous }>&larr;</a></li>
                        <span className = "currentPage">Page { currentPage } of { totalPages }</span>
                        <li id = "nextPage"><a onClick = { this.next }>&rarr;</a></li>
                      </ul>
                    </nav>
                    : null
                }
            </div>
        )
    }
})
