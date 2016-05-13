var React = require('react');
var actions = require('../actions/ResourceActions');
var Guid = require('guid');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            collectionID: this.props.info._id,
            item: {
                title: "",
                description: "",
                link: "http://"
            }
        };
    },

    componentDidMount: function () {
        // validation setup
        var submit = $('#submit');
        submit.prop('disabled', true)
    },

    addItem: function(e) {
        e.preventDefault();
        var state = this.state;
        var item = state.item;

        // set item information
        item.id = Guid.raw();
        item.edited = false;

        // set dates
        var now = new Date(Date.now());
        item.editDate = now;
        item.date = now;

        // set user info
        item.owner = this.props.login.user._id;
        item.ownerName = this.props.login.user.name;

        // check link format
        if (item.link === "http://") {
            item.link = ""
        } else if (!item.link.match(/^http/)) {
            item.link = 'http://' + item.link;
        }

        // process item
        state.item = item;
        actions.addItem(state);

        // reset the item form
        item.title = "";
        item.description = "";
        item.link = "http://";
        this.setState({ item: item })
    },

    handleInputChange: function(e) {
        e.preventDefault();
        var name = e.target.name;
        var value = e.target.value;
        var item = this.state.item;
        item[name] = value;
        this.setState({item: item});

        // validate element to set class
        var element = $("#" + name);
        var condition = false;
        switch (name) {
            case "title":
                condition = value.length > 0;
                break;
            case "description":
                condition = value.length > 0;
                break;
            case "ownerName":
                condition = value.length > 0;
                break;
            case "link":
                condition = true;
            default:
                break;
        }

        // should not be validating link at all
        if (condition) {
            element.parent().removeClass('has-error').addClass('has-success')
        } else {
            element.parent().removeClass('has-success').addClass('has-error')
        }
        this.validateForm();
    },

    validateForm: function() {
        // set submit button
        var submit = $('#submit'),
            title = this.state.item.title.length > 0,
            description = this.state.item.description.length > 0,
            loggedIn = this.props.login.status,
            valid = title && description && ownerName && loggedIn;

        if (valid) {
            submit.prop('disabled', false);
        } else {
            submit.prop('disabled', true);
        }
    },

    render: function() {
        var userName = (this.props.login.status ? this.props.login.user.name : "")
        return (
            <div id = 'addItemForm'>
                <form onSubmit = { this.addItem } >
                    <div className="form-group">
                        <label className = 'control-label' HTMLfor="title">Item Title</label>
                        <input type="text" className="form-control"
                               id="title"
                               name = 'title'
                               placeholder="Title"
                               value = { this.state.item.title }
                               onChange = { this.handleInputChange } />
                               <p className="help-block">Required</p>
                    </div>
                    <div className="form-group">
                        <label className = 'control-label' HTMLfor="title">Link</label>
                        <input type="text" className="form-control"
                               id="link"
                               name = 'link'
                               value = { this.state.item.link }
                               onChange = { this.handleInputChange } />
                    </div>
                    <div className="form-group">
                        <label className = 'control-label' HTMLfor="author">Author</label>
                        <input type="text" className="form-control"
                               id="ownerName"
                               name = 'ownerName'
                               placeholder= ""
                               value = { userName }
                               disabled />
                        <p className="help-block">Log in to change authorship.</p>
                    </div>
                    <div className="form-group">
                        <textarea className="form-control" rows = "3"
                                  id="description"
                                  name = 'description'
                                  placeholder="You can change the size of this box by dragging the lower-right corner."
                                  value = { this.state.item.description }
                                  onChange = { this.handleInputChange } />
                              <p className="help-block">Include publication details, links, and other useful information (Required)</p>

                    </div>
                    <button id = "submit" type="submit" className="btn btn-default" disabled='true'>{ this.props.login.status ? 'Submit' : 'Log in to add an item' }</button>
                </form>
            </div>
        )
    }
});
