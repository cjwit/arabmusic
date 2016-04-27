var React = require('react');
var ResourceItem = require('./ResourceItem.jsx');
var resourceActions = require('../actions/ResourceActions');

module.exports = React.createClass({
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

    editCollection: function(e) {
        e.preventDefault();
        // postActions.editPost(this.props.info)
    },

    render: function() {
        var info = this.props.info;
        var id = info._id;
        var collectionPage = Boolean(window.location.pathname.match(/^\/resources\//));

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

        return (
            <div className = 'collection' id = { id }>
                <span className = 'collection-title'>
                    { info.title }:&nbsp;
                </span>

                { !collectionPage ?
                    <div className = 'btn-group pull-right' role = 'group' aria-label='...'>
                        <a href= { 'resources/' + id } className = 'btn btn-default'>
                            <span className="glyphicon glyphicon-zoom-in" aria-hidden="true"></span>
                        </a>
                    </div>
                        :
                    <div className = 'btn-group pull-right' role = 'group' aria-label='...'>
                        <a onClick = { this.editCollection } className = 'btn btn-default'>
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
    }
})
