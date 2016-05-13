var React = require('react');
var ResourceList = require('./ResourceList.jsx');
var NoticeList = require('./NoticeList.jsx');
var ResourceHeader = require('./ResourceHeader.jsx');
var AddCollection = require('./AddCollection.jsx');
var AddNotice = require('./AddNotice.jsx');
var Navbar = require('./Navbar.jsx');
var Footer = require('./Footer.jsx');
var SortFilter = require('../actions/SortFilter.jsx');
var tags = require('../tags.js');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            AddCollection: false,
            AddNotice: false,
            resourceSort: 'edit',
            noticeSort: 'eventDate',
            resourceFilter: [],
            noticeFilter: []
        };
    },

    componentWillReceiveProps: function() {
        this.setState({
            AddCollection: false,
            AddNotice: false
        })
    },

    componentDidMount: function () {
        var toggleResourceTag = this.toggleResourceTag;
        $('#resourceTags :input').change(function() {
            toggleResourceTag(this.name);
        })
        var toggleNoticeTag = this.toggleNoticeTag;
        $('#noticeTags :input').change(function() {
            toggleNoticeTag(this.name);
        })

        // hide filters and set handlers
        $("#resourceTags").hide();
        $("#resourceFilter").click(function(){
            $("#resourceTags").slideToggle();
        })
        $("#noticeTags").hide();
        $("#noticeFilter").click(function(){
            $("#noticeTags").slideToggle();
        })
    },

    toggleResourceTag: function(name) {
        var tags = this.state.resourceFilter;
        var index = tags.indexOf(name)
        if (index === -1) {
            tags.push(name);
        } else {
            tags.splice(index, 1);
        }
        this.setState({
            resourceFilter: tags
        })
    },

    toggleNoticeTag: function(name) {
        var tags = this.state.noticeFilter;
        var index = tags.indexOf(name)
        if (index === -1) {
            tags.push(name);
        } else {
            tags.splice(index, 1);
        }
        this.setState({
            noticeFilter: tags
        })
    },

    setResourceSort: function(e) {
        var setting = e.target.id;
        this.setState({ resourceSort: setting })
    },

    setNoticeSort: function(e) {
        var setting = e.target.id;
        this.setState({ noticeSort: setting })
    },

    toggleCollection: function() {
        this.setState({
            AddNotice: false,
            AddCollection: !this.state.AddCollection
        })
        return;
    },

    toggleNotice: function() {
        this.setState({
            AddCollection: false,
            AddNotice: !this.state.AddNotice
        })
        return;
    },

    render: function() {
        var resources = SortFilter.sortAndFilter(this.props.resources, this.state.resourceFilter, this.state.resourceSort);
        var notices = SortFilter.sortAndFilter(this.props.notices, this.state.noticeFilter, this.state.noticeSort);
        var login = this.props.login;

        var tagButtons = [];
        var allTags = tags.geographic.concat(tags.musical).concat(tags.conceptual);
        allTags.map(function(tag, index) {
            tagButtons.push(
                <label className = 'tag btn btn-default btn-xs' onChange = { this.toggleResourceTag } key = { 'check' + tag }>
                    <input type = 'checkbox' name = { tag } autocomplete='off' /> { tag }
                </label>)
        });

        return (
            <div>
                <Navbar active = 'resources' login = { login }/>
                <ResourceHeader />

                { this.state.AddCollection ? <AddCollection login = { login }/> : null }
                { this.state.AddNotice ? <AddNotice login = { login }/> : null }

                <div className = 'container'>
                    <div className = 'row'>
                        <div className = 'col-md-6'>
                            <div className = 'holder'>
                                <h1>
                                    { login.status ?
                                        <button id = 'addCollectionFormToggle'
                                            className = 'btn btn-default pull-right'
                                            onClick = { this.toggleCollection } >Create a Collection
                                        </button>
                                        :
                                        <button id = 'addCollectionFormToggle'
                                            className = 'btn btn-default pull-right disabled'>
                                            Login to Create a Collection
                                        </button>
                                    }

                                    Resource Collections
                                </h1>
                                <div className = 'btn-group sort-filter' role = 'group' aria-label='...'>
                                    <a id = "edit" onClick = { this.setResourceSort } className = 'btn btn-default btn-xs'>
                                        <span className="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>&nbsp;
                                        Last Edit
                                    </a>
                                    <a id = "title" onClick = { this.setResourceSort } className = 'btn btn-default btn-xs'>
                                        <span className="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>&nbsp;
                                        Title
                                    </a>
                                    <a id = "resourceFilter" className = 'btn btn-default btn-xs'>
                                        <span className="glyphicon glyphicon-tag" aria-hidden="true"></span>&nbsp;
                                        Filter
                                    </a>
                                </div>
                                <div id = "resourceTags" className = 'filter-tags' data-toggle='buttons'>
                                    { tagButtons }
                                </div>

                                <ResourceList resources = { resources } login = { login }/>
                            </div>
                        </div>
                        <div className = 'col-md-6'>
                            <div className = 'holder'>
                                <h1>
                                    { login.status ?
                                        <button id = 'addNoticeFormToggle'
                                            className = 'btn btn-default pull-right'
                                            onClick = { this.toggleNotice } >Post a Notice
                                        </button>
                                        :
                                        <button id = 'addNoticeFormToggle'
                                            className = 'btn btn-default pull-right disabled'>
                                            Login to Post a Notice
                                        </button>
                                    }

                                    Notices
                                </h1>
                                <div className = 'btn-group sort-filter' role = 'group' aria-label='...'>
                                    <a id = "edit" onClick = { this.setNoticeSort } className = 'btn btn-default btn-xs'>
                                        <span className="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>&nbsp;
                                        Last Edit
                                    </a>
                                    <a id = "name" onClick = { this.setNoticeSort } className = 'btn btn-default btn-xs'>
                                        <span className="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>&nbsp;
                                        Title
                                    </a>
                                    <a id = "eventDate" onClick = { this.setNoticeSort } className = 'btn btn-default btn-xs'>
                                        <span className="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>&nbsp;
                                        Event Date
                                    </a>
                                    <a id = "noticeFilter" className = 'btn btn-default btn-xs'>
                                        <span className="glyphicon glyphicon-tag" aria-hidden="true"></span>&nbsp;
                                        Filter
                                    </a>
                                </div>

                                <div id = "noticeTags" className = 'filter-tags' data-toggle='buttons'>
                                    { tagButtons }
                                </div>

                                <NoticeList notices = { notices } login = { login }/>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
});
