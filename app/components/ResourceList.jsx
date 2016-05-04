var React = require('react');
var ResourceCollection = require('./ResourceCollection.jsx');

module.exports = React.createClass({
    sortByEdit: function() {
        var resources = this.props.resources;
        var list = resources.sort(function(a, b) {
            return new Date(b.editDate) - new Date(a.editDate);
        });
        return list;
    },

    sortByTitle: function() {
        var resources = this.props.resources;
        var list = resources.sort(function(a, b) {
            var titleA = a.title.toUpperCase();
            var titleB = b.title.toUpperCase();
            if (titleA < titleB) {
                return -1;
            } else if (titleA > titleB) {
                return 1;
            }
            return 0;
        });
        return list;
    },

    render: function() {
        var resources = this.sortByEdit();
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
