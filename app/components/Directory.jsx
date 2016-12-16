var React = require('react');
var Navbar = require('./Navbar.jsx');
var DirectoryList = require('./DirectoryList.jsx');
var Footer = require('./Footer.jsx');
var SortFilter = require('../actions/SortFilter.jsx');
var tags = require('../tags.js');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            sortMethod: 'name',
            filterUsers: []
        };
    },

    componentDidMount: function () {
        var toggleFilterTag = this.toggleFilterTag;
        $('#filterTags :input').change(function() {
            toggleFilterTag(this.name);
        })
        // hide filters and set handlers
        $("#filterTags").hide();
        $("#filterUsers").click(function(){
            $("#filterTags").slideToggle();
        })
    },

    toggleFilterTag: function(name) {
        var tags = this.state.filterUsers;
        var index = tags.indexOf(name)
        if (index === -1) {
            tags.push(name);
        } else {
            tags.splice(index, 1);
        }
        this.setState({
            filterUsers: tags
        })
    },

    setSortMethod: function(e) {
        var setting = e.target.id;
        this.setState({ sortMethod: setting })
    },

    render: function() {
		console.log('render directory')
		var users = SortFilter.sortAndFilter(this.props.users, this.state.filterUsers, this.state.sortMethod);
        var login = this.props.login;

        var tagButtons = [];
        var allTags = tags.geographic.concat(tags.musical).concat(tags.conceptual);
        allTags.map(function(tag, index) {
            tagButtons.push(
                <label className = 'tag btn btn-default btn-xs' onChange = { this.toggleFilterTag } key = { 'check' + tag }>
                    <input type = 'checkbox' name = { tag } autocomplete='off' /> { tag }
                </label>)
        });

        return (
            <div>
                <Navbar active = 'directory' login = { login } />
                <div id = 'subContainer' className = 'container'>
                    <div className = 'row holder'>
                        <div className = 'col-md-8 col-md-offset-2'>
                            <h1>Members of Arab Music Research</h1>

                            <div className = 'btn-group sort-filter' role = 'group' aria-label='...'>
                                <a id = "name" onClick = { this.setSortMethod } className = 'btn btn-default btn-xs'>
                                    <span className="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>&nbsp;
                                    Name
                                </a>
                                <a id = "filterUsers" className = 'btn btn-default btn-xs'>
                                    <span className="glyphicon glyphicon-tag" aria-hidden="true"></span>&nbsp;
                                    Interest
                                </a>
                            </div>

                            <div id = "filterTags" className = 'filter-tags' data-toggle='buttons'>
                                { tagButtons }
                            </div>

                            <DirectoryList users = { users } login = { login } />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
})
