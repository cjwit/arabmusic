var React = require('react');
var ResourceItem = require('./ResourceItem.jsx');
var actions = require('../actions/ResourceActions');
var tags = require('../tags.js');

module.exports = React.createClass({
    getInitialState: function() {
        return ({
            editing: false,
            info: {
                title: this.props.info.title,
                description: this.props.info.description,
                tags: this.props.info.tags,
                items: this.props.info.items,
            }
        })
    },

    editCollection: function(e) {
        e.preventDefault();
        actions.editCollection(this.state.info);
        this.setState({ editing: false });
    },

    openForm: function() {
        this.setState({ editing: true })
        var info = this.state.info

        // wait for rendering to complete
        var toggleTag = this.toggleTag;
        window.requestAnimationFrame(function() {
            // set up form
            $('#tags :input').change(function() {
                toggleTag(this.name);
            })
        })
    },

    closeForm: function(e) {
        e.preventDefault();
        this.setState({ editing: false });
    },

    toggleTag: function(name) {
        var info = this.state.info;
        var index = info.tags.indexOf(name)
        if (index === -1) {
            info.tags.push(name);
        } else {
            info.tags.splice(index, 1);
        }
        this.setState({
            info: info
        })
    },

    deleteCollection: function(e) {
        e.preventDefault();
        resourceActions.deleteCollection(this.props.info)

        // redirect if on detail page
        var path = window.location.pathname;
        var split = path.split('/')
        var folder = split[1]
        var id = split[2] || null
        if (id != null) {
            window.location.href = '/' + folder;
        }
    },

    handleInputChange: function(e) {
        e.preventDefault();
        var name = e.target.name;
        var value = e.target.value;
        var info = this.state.info;
        info[name] = value;
        this.setState({
            info: info
        });
    },

    render: function() {
        var info = this.state.info;
        var id = this.props.info._id;
        var collectionPage = Boolean(window.location.pathname.match(/^\/resources\/\w/));

        var items = [];
        if (info.items.length > 0) {
            info.items.forEach(function(item, index) {
                items.push(<ResourceItem info = { item.item } collectionID = { id } key = { 'item' + index }/>)
            });
        }

        var tagString = '';
        info.tags.map(function(tag, index) {
            if (index === info.tags.length - 1) {
                tagString += tag;
            } else {
                tagString += tag + ', ';
            }
        })

        if (!this.state.editing) {
            return (
                <div className = 'collection' id = { id }>
                    <span className = 'collection-title'>
                        { info.title }:&nbsp;
                    </span>

                    { !collectionPage ?
                        <div className = 'btn-group pull-right' role = 'group' aria-label='...'>
                            <a href= { '/resources/' + id } className = 'btn btn-default'>
                                <span className="glyphicon glyphicon-zoom-in" aria-hidden="true"></span>
                            </a>
                        </div>
                            :
                        <div className = 'btn-group pull-right' role = 'group' aria-label='...'>
                            <a onClick = { this.openForm } className = 'btn btn-default'>
                                <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                            </a>
                            <a onClick = { this.deleteCollection } className = 'btn btn-default'>
                                <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                            </a>
                        </div>
                    }
                    <div className = 'collection-description'>
                        { info.description }
                    </div>
                    { info.tags.length > 0 ?
                        <div className = 'resource-tags'>
                            <span className = 'glyphicon glyphicon-tag' aria-hidden = 'true'></span>&nbsp;
                            { tagString }
                        </div>
                        : null
                    }
                    { items }

                </div>
            )
        } else {
            var tagButtons = [];
            var allTags = tags.geographic.concat(tags.musical).concat(tags.conceptual);
            allTags.map(function(tag, index) {
                var preChecked = (info.tags.indexOf(tag) !== -1)
                tagButtons.push(
                    <label className = { preChecked ? 'tag btn btn-default btn-xs active' : 'tag btn btn-default btn-xs' }
                           onChange = { this.toggleTag }
                           key = { 'check' + tag }>
                        <input type = 'checkbox'
                               name = { tag }
                               autocomplete='off'
                               defaultChecked = { preChecked } /> { tag }
                    </label>)
            });
            return (
                <div className = 'collection' id = { id }>
                    <form onSubmit = { this.editCollection } id = 'editCollectionForm'>
                        <div className="form-group">
                            <label className = 'control-label' HTMLfor="title">Edit Your Collection</label>
                            <input type="text" className="form-control"
                                   id="title"
                                   name = 'title'
                                   placeholder="Title"
                                   defaultValue = { info.title }
                                   onChange = { this.handleInputChange } />
                        </div>
                        <div className="form-group">
                            <textarea className="form-control" rows = "3"
                                      id="description"
                                      name = 'description'
                                      defaultValue = { info.description }
                                      onChange = { this.handleInputChange } />
                        </div>
                        <div className="form-group">
                            <div id = 'tags' class = 'btn-group' data-toggle='buttons'>
                                { tagButtons }
                            </div>
                        </div>

                        <button type="submit" className="btn btn-default">Submit</button>&nbsp;
                        <button className="btn btn-danger" onClick = { this.closeForm }>Cancel</button>
                    </form>
                </div>
            )
        }
    }
})
