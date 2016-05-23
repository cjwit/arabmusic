var React = require('react');
var DiscussionHeader = require('./DiscussionHeader.jsx');
var DiscussionList = require('./DiscussionList.jsx');
var PostForm = require('./PostForm.jsx');
var Navbar = require('./Navbar.jsx');
var Footer = require('./Footer.jsx');
var SortFilter = require('../actions/SortFilter.jsx');
var tags = require('../tags.js');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            postSort: 'dateDescending',
            postFilter: []
        };
    },

    componentDidMount: function () {
        var togglePostTag = this.togglePostTag;
        $('#postTags :input').change(function() {
            togglePostTag(this.name);
        })

        // hide filters and set handlers
        $("#postTags").hide();
        $("#postFilter").click(function(){
            $("#postTags").slideToggle();
        })
    },

    togglePostTag: function(name) {
        var tags = this.state.postFilter;
        var index = tags.indexOf(name)
        if (index === -1) {
            tags.push(name);
        } else {
            tags.splice(index, 1);
        }
        this.setState({
            postFilter: tags
        })
    },

    setPostSort: function(e) {
        var setting = e.target.id;
        this.setState({ postSort: setting })
    },

    render: function() {
        var discussions = SortFilter.sortAndFilter(this.props.discussions, this.state.postFilter, this.state.postSort);
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
                <Navbar active = 'discussions' login = { login }/>
                <DiscussionHeader />
                <div id = 'subContainer' className = 'container'>
                    <div className = 'row holder'>
                        <div className = 'col-md-4'>
                            <h1 className = 'spacer'>&nbsp;</h1>
                            <div id = "addPostContainer">
                                <PostForm login = { this.props.login } />
                            </div>

                        </div>
                        <div className = 'col-md-8'>
                            <h1>Recent Posts</h1>

                            <div className = 'btn-group sort-filter' role = 'group' aria-label='...'>
                                <a id = "author" onClick = { this.setPostSort } className = 'btn btn-default btn-xs'>
                                    <span className="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>&nbsp;
                                    Author
                                </a>
                                <a id = "dateDescending" onClick = { this.setPostSort } className = 'btn btn-default btn-xs'>
                                    <span className="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>&nbsp;
                                    Recent
                                </a>
                                <a id = "commentDate" onClick = { this.setPostSort } className = 'btn btn-default btn-xs'>
                                    <span className="glyphicon glyphicon-triangle-bottom" aria-hidden="true"></span>&nbsp;
                                    Recent Comment
                                </a>
                                <a id = "postFilter" className = 'btn btn-default btn-xs'>
                                    <span className="glyphicon glyphicon-tag" aria-hidden="true"></span>&nbsp;
                                    Filter
                                </a>
                            </div>
                            <div id = "postTags" className = 'filter-tags' data-toggle='buttons'>
                                { tagButtons }
                            </div>

                            <DiscussionList discussions = { discussions } login = { login } />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
});
