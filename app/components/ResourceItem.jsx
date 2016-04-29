var React = require('react');
var actions = require('../actions/ResourceActions');

module.exports = React.createClass({
    getInitialState: function() {
        return ({
            editing: false,
            info: {
                title: this.props.info.title,
                author: this.props.info.author,
                description: this.props.info.description
            }
        })
    },

    deleteItem: function(e) {
        e.preventDefault();
        var payload = {
            collectionID: this.props.collectionID,
            item: this.state.info
        }
        actions.deleteItem(payload)
    },

    openForm: function(e) {
        e.preventDefault();
        this.setState({ editing: true })
    },

    closeForm: function(e) {
        e.preventDefault();
        this.setState({ editing: false });
    },

    editItem: function(e) {
        e.preventDefault();
        var payload = {
            collectionID: this.props.collectionID,
            item: this.state.info
        }
        actions.editItem(payload)
        this.setState({ editing: false });
    },

    render: function() {
        var info = this.state.info;
        var collectionPage = Boolean(window.location.pathname.match(/^\/resources\/\w/));

        if (this.state.editing) {
            return (
                <div className = 'item'>
                    <form onSubmit = { this.editItem } id = 'editItemForm'>
                        <div className="form-group">
                            <label className = 'control-label' HTMLfor="title">Edit Your Item</label>
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
                        <button type="submit" className="btn btn-default">Submit</button>&nbsp;
                        <button className="btn btn-danger" onClick = { this.closeForm }>Cancel</button>
                    </form>
                </div>
            )
        } else {
            return (
                <div className = 'item'>
                    <span className = 'item-title'>
                        { info.title }:&nbsp;
                    </span>

                    { collectionPage ?

                        <div className = 'btn-group pull-right' role = 'group' aria-label='...'>
                            <a onClick = { this.openForm } className = 'btn btn-default'>
                                <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                            </a>
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
    }
})
