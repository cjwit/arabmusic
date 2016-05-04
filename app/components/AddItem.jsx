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
                link: "http://",
                author: "Tester McTestFace"      // get from login
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
        item = this.state.item
        item.id = Guid.raw();
        item.edited = false;
        var now = new Date(Date.now());
        item.editDate = now;
        item.date = now;

        // check link format
        if (item.link === "http://") {
            item.link = ""
        } else if (!item.link.match(/^http/)) {
            item.link = 'http://' + item.link;
        }

        this.setState({ item: item })
        actions.addItem(this.state);

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
                condition = value.length > 1;
                break;
            case "description":
                condition = value.length > 1;
                break;
            default:
                break;
        }
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
            title = this.state.item.title.length > 1,
            description = this.state.item.description.length > 1,
            valid = title && description;
        if (valid) {
            submit.prop('disabled', false);
        } else {
            submit.prop('disabled', true);
        }
    },

    render: function() {
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
                               id="author"
                               name = 'author'
                               placeholder="Author"
                               value = { this.state.item.author }
                               onChange = { this.handleInputChange }
                               disabled />
                        <p className="help-block">Log out and back in again to change authorship.</p>
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
                    <button id = "submit" type="submit" className="btn btn-default">Submit</button>
                </form>
            </div>
        )
    }
});
