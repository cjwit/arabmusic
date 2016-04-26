var React = require('react');
var ResourceCollection = require('./ResourceCollection.jsx');

module.exports = React.createClass({
    render: function() {
        var collectionList = [];
        this.props.resources.map(function (collection, index) {
            collectionList.push(<ResourceCollection info = { collection } key = { 'collection' + index } />)
        });
        return (
            <div className = 'list'>
                { collectionList }
            </div>
        )
    }
})
