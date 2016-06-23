var React = require('react');
var NoticeList = require('./NoticeList.jsx');
var NoticeHeader = require('./NoticeHeader.jsx');
var AddNotice = require('./AddNotice.jsx');
var Navbar = require('./Navbar.jsx');
var Footer = require('./Footer.jsx');
var SortFilter = require('../actions/SortFilter.jsx');
var tags = require('../tags.js');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            AddNotice: false,
            noticeSort: 'date',
            noticeFilter: []
        };
    },

    componentWillReceiveProps: function() {
        this.setState({
            AddNotice: false
        })
    },

    componentDidMount: function () {
        var toggleNoticeTag = this.toggleNoticeTag;
        $('#noticeTags :input').change(function() {
            toggleNoticeTag(this.name);
        })

        // hide filters and set handlers
        $("#noticeTags").hide();
        $("#noticeFilter").click(function(){
            $("#noticeTags").slideToggle();
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

    setNoticeSort: function(e) {
        var setting = e.target.id;
        this.setState({ noticeSort: setting })
    },

    toggleNotice: function() {
        this.setState({
            AddCollection: false,
            AddNotice: !this.state.AddNotice
        })
        return;
    },

    render: function() {
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
                <Navbar active = 'notices' login = { login }/>
                <NoticeHeader />

                { this.state.AddNotice ? <AddNotice login = { login }/> : null }

                <div className = 'container'>
                    <div className = 'row'>
                        <div className = 'col-md-8 col-md-offset-2'>
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
                                    <a id = "date" onClick = { this.setNoticeSort } className = 'btn btn-default btn-xs'>
                                        <span className="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>&nbsp;
                                        Date
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
