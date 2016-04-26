var React = require('react');
var ResourceItem = require('./ResourceItem.jsx');
var resourceActions = require('../actions/ResourceActions');

module.exports = React.createClass({
    deleteCollection: function(e) {
        e.preventDefault();
        postActions.deleteCollection(this.props.info)
        // window.location.href = '/discussions.html';
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

                { items }

            </div>
        )
    }
})
