var React = require('react');
var ResourceCollection = require('./ResourceCollection.jsx');

module.exports = React.createClass({
    render: function() {
        var resources = this.props.resources;
        var collectionList = [];
        resources.map(function (collection, index) {
            collectionList.push(<ResourceCollection info = { collection } key = { 'collection' + index } />)
        });
        return (
            <div className = 'list'>
                { collectionList }
            </div>
        )
    }
})
