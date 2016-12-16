var React = require('react');
var ResourceList = require('./ResourceList.jsx');
var ResourceHeader = require('./ResourceHeader.jsx');
var AddCollection = require('./AddCollection.jsx');
var Navbar = require('./Navbar.jsx');
var Footer = require('./Footer.jsx');
var SortFilter = require('../actions/SortFilter.jsx');
var tags = require('../tags.js');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            AddCollection: false,
            resourceSort: 'edit',
            resourceFilter: [],
        };
    },

    componentWillReceiveProps: function() {
        this.setState({
            AddCollection: false
        })
    },

    componentDidMount: function () {
        var toggleResourceTag = this.toggleResourceTag;
        $('#resourceTags :input').change(function() {
            toggleResourceTag(this.name);
        })

        // hide filters and set handlers
        $("#resourceTags").hide();
        $("#resourceFilter").click(function(){
            $("#resourceTags").slideToggle();
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

    setResourceSort: function(e) {
        var setting = e.target.id;
        this.setState({ resourceSort: setting })
    },

    toggleCollection: function() {
        this.setState({
            AddNotice: false,
            AddCollection: !this.state.AddCollection
        })
        return;
    },

    render: function() {
        var resources = SortFilter.sortAndFilter(this.props.resources, this.state.resourceFilter, this.state.resourceSort);
        var login = this.props.login;

        var tagButtons = [];
        var allTags = tags.geographic.concat(tags.musical).concat(tags.conceptual);
		var toggleResourceTag = this.toggleResourceTag;

        allTags.map(function(tag, index) {
            tagButtons.push(
                <label className = 'tag btn btn-default btn-xs' onChange = { toggleResourceTag } key = { 'check' + tag }>
                    <input type = 'checkbox' name = { tag } autocomplete='off' /> { tag }
                </label>)
        });

        return (
            <div>
                <Navbar active = 'resources' login = { login }/>
                <ResourceHeader />

                { this.state.AddCollection ? <AddCollection login = { login }/> : null }

                <div className = 'container'>
                    <div className = 'row'>
                        <div className = 'col-md-8 col-md-offset-2'>
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
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
});
