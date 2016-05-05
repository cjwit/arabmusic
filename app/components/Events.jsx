var React = require('react');
var EventList = require('./EventList.jsx');
var EventForm = require('./EventForm.jsx');
var EventHeader = require('./EventHeader.jsx');
var Navbar = require('./Navbar.jsx');
var Footer = require('./Footer.jsx');
var SortFilter = require('../actions/SortFilter.jsx');
var tags = require('../tags.js');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            showForm: false,
            previousSort: 'dateDescending',
            upcomingSort: 'date',
            previousFilter: [],
            upcomingFilter: []
        };
    },

    componentWillReceiveProps: function() {
        this.setState({ showForm: false })
    },

    componentDidMount: function () {
        var toggleUpcomingTag = this.toggleUpcomingTag;
        $('#upcomingTags :input').change(function() {
            toggleUpcomingTag(this.name);
        })
        var togglePreviousTag = this.togglePreviousTag;
        $('#previousTags :input').change(function() {
            togglePreviousTag(this.name);
        })

        // hide filters and set handlers
        $("#upcomingTags").hide();
        $("#upcomingFilter").click(function(){
            $("#upcomingTags").slideToggle();
        })
        $("#previousTags").hide();
        $("#previousFilter").click(function(){
            $("#previousTags").slideToggle();
        })
    },

    toggleUpcomingTag: function(name) {
        var tags = this.state.upcomingFilter;
        var index = tags.indexOf(name)
        if (index === -1) {
            tags.push(name);
        } else {
            tags.splice(index, 1);
        }
        this.setState({
            upcomingFilter: tags
        })
    },

    togglePreviousTag: function(name) {
        var tags = this.state.previousFilter;
        var index = tags.indexOf(name)
        if (index === -1) {
            tags.push(name);
        } else {
            tags.splice(index, 1);
        }
        this.setState({
            previousFilter: tags
        })
    },

    setUpcomingSort: function(e) {
        var setting = e.target.id;
        this.setState({ upcomingSort: setting })
    },

    setPreviousSort: function(e) {
        var setting = e.target.id;
        this.setState({ previousSort: setting })
    },


    toggleForm: function() {
        this.setState({ showForm: !this.state.showForm })
        return;
    },

    render: function() {
        var events = this.props.events;
        var today = new Date(Date.now());
        var upcomingRaw = events.filter(function(event) {
            return event.date >= today || event.date.toDateString() == today.toDateString();
        })
        var previousRaw = events.filter(function(event) {
            return event.date < today && event.date.toDateString() !== today.toDateString();
        })

        // sort and filter
        var filteredUpcoming = SortFilter.filterBy(upcomingRaw, this.state.upcomingFilter);
        var upcoming = SortFilter.getSorted(filteredUpcoming, this.state.upcomingSort);
        var filteredPrevious = SortFilter.filterBy(previousRaw, this.state.previousFilter);
        var previous = SortFilter.getSorted(filteredPrevious, this.state.previousSort);
        var login = this.props.login;

        var tagButtons = [];
        var allTags = tags.geographic.concat(tags.musical).concat(tags.conceptual);
        allTags.map(function(tag, index) {
            tagButtons.push(
                <label className = 'tag btn btn-default btn-xs' key = { 'check' + tag }>
                    <input type = 'checkbox' name = { tag } autocomplete='off' /> { tag }
                </label>)
        });

        return (
            <div>
                <Navbar active = 'events' login = { login }/>
                <EventHeader />

                { this.state.showForm ? <EventForm /> : null }

                <div id = 'currentEvents' className = 'container'>
                    <div className = 'row'>
                        <div className = 'col-md-6'>
                            <div className = 'holder'>
                                <h1>
                                    { login ?
                                        <button id = 'addEventFormToggle'
                                            className = 'btn btn-default pull-right'
                                            onClick = { this.toggleForm } >
                                            Add an Event
                                        </button>
                                        :
                                        <button id = 'addEventFormToggle'
                                            className = 'btn btn-default pull-right' >
                                            Login to Add and Event
                                        </button>
                                    }
                                    Upcoming Events
                                </h1>

                                <div className = 'btn-group sort-filter' role = 'group' aria-label='...'>
                                    <a id = "name" onClick = { this.setUpcomingSort } className = 'btn btn-default btn-xs'>
                                        <span className="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>&nbsp;
                                        Name
                                    </a>
                                    <a id = "date" onClick = { this.setUpcomingSort } className = 'btn btn-default btn-xs'>
                                        <span className="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>&nbsp;
                                        Event Date
                                    </a>
                                    <a id = "edit" onClick = { this.setUpcomingSort } className = 'btn btn-default btn-xs'>
                                        <span className="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>&nbsp;
                                        Last Edit
                                    </a>
                                    <a id = "upcomingFilter" className = 'btn btn-default btn-xs'>
                                        <span className="glyphicon glyphicon-tag" aria-hidden="true"></span>&nbsp;
                                        Filter
                                    </a>
                                </div>
                                <div id = "upcomingTags" className = 'filter-tags' data-toggle='buttons'>
                                    { tagButtons }
                                </div>

                                <EventList events = { upcoming } />
                            </div>
                        </div>
                        <div className = 'col-md-6'>
                            <div className = 'holder'>
                                <h1>Past Events</h1>

                                <div className = 'btn-group sort-filter' role = 'group' aria-label='...'>
                                    <a id = "name" onClick = { this.setPreviousSort } className = 'btn btn-default btn-xs'>
                                        <span className="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>&nbsp;
                                        Name
                                    </a>
                                    <a id = "dateDescending" onClick = { this.setPreviousSort } className = 'btn btn-default btn-xs'>
                                        <span className="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>&nbsp;
                                        Most Recent
                                    </a>
                                    <a id = "edit" onClick = { this.setPreviousSort } className = 'btn btn-default btn-xs'>
                                        <span className="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>&nbsp;
                                        Last Edit
                                    </a>
                                    <a id = "previousFilter" className = 'btn btn-default btn-xs'>
                                        <span className="glyphicon glyphicon-tag" aria-hidden="true"></span>&nbsp;
                                        Filter
                                    </a>
                                </div>
                                <div id = "previousTags" className = 'filter-tags' data-toggle='buttons'>
                                    { tagButtons }
                                </div>

                                <EventList events = { previous } />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
});
