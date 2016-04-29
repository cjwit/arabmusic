var React = require('react');
var resourceActions = require('../actions/ResourceActions');

module.exports = React.createClass({
    deleteItem: function(e) {
        e.preventDefault();
        var payload = {
            collectionID: this.props.collectionID,
            item: this.props.info
        }
        resourceActions.deleteItem(payload)
    },

    render: function() {
        var info = this.props.info;
        var resourcePage = Boolean(window.location.pathname.match(/^\/resources\/\w/));

        return (
            <div className = 'item'>
                <span className = 'item-title'>
                    { info.title }:&nbsp;
                </span>

                { resourcePage ?

                    <div className = 'btn-group pull-right' role = 'group' aria-label='...'>
                        <a onClick = { this.deleteItem } className = 'btn btn-default'>
                            <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        </a>
                    </div>
                    : null
                }

                <span className = 'item-content'>
                    { info.description }
                </span>

                { info.author !== '' ?
                    <span className = 'item-author'>
                        &nbsp;(Added by { info.author })
                    </span> : null
                }

            </div>
        )
    }
})
