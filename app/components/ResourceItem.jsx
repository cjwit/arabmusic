var React = require('react');
var actions = require('../actions/ResourceActions');

module.exports = React.createClass({
    getInitialState: function() {
        return ({
            editing: false,
            info: {
                title: this.props.info.title,
                link: this.props.info.link,
                description: this.props.info.description
            }
        })
    },

    deleteItem: function(e) {
        e.preventDefault();
        var info = this.state.info;
        info.id = this.props.info.id;

        var payload = {
            collectionID: this.props.collectionID,
            item: info
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
        var info = this.state.info;

        // add unchanged info
        info.date = new Date(this.props.info.date);
        info.id = this.props.info.id;
        info.ownerName = this.props.info.ownerName;
        info.owner = this.props.info.owner;

        // update edit data
        info.edited = true;
        info.editDate = new Date(Date.now());

        var payload = {
            collectionID: this.props.collectionID,
            item: info
        }
        actions.editItem(payload)
        this.setState({ editing: false });
    },

    handleInputChange: function(e) {
        e.preventDefault();
        var name = e.target.name;
        var value = e.target.value;
        var info = this.state.info;
        info[name] = value;
        this.setState({info: info});
    },

    render: function() {
        var props = this.props.info,
            login = this.props.login,
            userID = "",
            myItem = false;

        if (login.status === true) {
            userID = login.user._id;
        }

        if (userID !== "" && userID === props.owner) {
            myItem = true;
        }

        var ownerButtons = null;
        if (myItem === true) {
            ownerButtons = <div className = 'btn-group pull-right' role = 'group' aria-label='...'>
                <a onClick = { this.openForm } role = 'button' className = 'btn btn-default'>
                    <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                </a>
                <a onClick = { this.deleteItem } role = 'button' className = 'btn btn-default'>
                    <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                </a>
            </div>
        }

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
                                   defaultValue = { props.title }
                                   onChange = { this.handleInputChange } />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control"
                                   id="link"
                                   name = 'link'
                                   placeholder="Link"
                                   defaultValue = { props.link || 'http://' }
                                   onChange = { this.handleInputChange } />
                        </div>
                        <div className="form-group">
                            <textarea className="form-control" rows = "3"
                                      id="description"
                                      name = 'description'
                                      defaultValue = { props.description }
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
                    { props.link === "" ?
                        <span className = 'item-title'>
                            { props.title }:&nbsp;
                        </span>
                        :
                        <a href = { props.link} target = "_blank">
                            <span className = 'item-title'>
                                { props.title }:&nbsp;
                            </span>
                        </a>
                    }

                    {
                        collectionPage ?
                            <div className = 'pull-right'>{ ownerButtons }</div>
                        :
                            null
                    }


                    <span className = 'item-content'>
                        { props.description }
                        { props.ownerName !== '' ?
                            <span className = 'item-author'>
                                &nbsp;(Added by { props.ownerName })
                            </span> : null
                        }

                        { props.edited && collectionPage ?
                            <p>(Edited on { new Date(props.editDate).toLocaleDateString() })</p>
                            : null
                        }
                    </span>
                </div>
            )
        }
    }
})
