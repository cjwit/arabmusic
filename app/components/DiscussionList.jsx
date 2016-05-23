var React = require('react');
var Discussion = require('./Discussion.jsx');

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

    componentWillReceiveProps: function() {
        this.setState({ startIndex: 0 });
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

        if (startIndex + listings < this.props.discussions.length) {
            startIndex += listings
            this.setState({ startIndex: startIndex })
        };

        previous.removeClass("disabled")
        if (startIndex + listings >= this.props.discussions.length) {
            next.addClass("disabled");
        } else {
            next.removeClass("disabled");
        }
    },

    render: function() {
        var incomingListings = this.props.discussions,
            incomingLength = incomingListings.length,
            startIndex = this.state.startIndex,
            endIndex = startIndex + this.state.listings,
            currentPage = startIndex / this.state.listings + 1,
            totalPages = Math.floor(incomingLength / this.state.listings) + 1,
            login = this.props.login;

        var discussions = incomingListings.slice(startIndex, endIndex);
        var discussionList = [];
        discussions.map(function (discussion, index) {
            discussionList.push(<Discussion info = { discussion } key = { 'discussion' + index } login = { login } />)
        });
        return (
            <div className = 'list'>
                { discussionList }
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
