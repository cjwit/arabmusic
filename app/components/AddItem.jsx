var React = require('react');
var actions = require('../actions/ResourceActions');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            collectionID: this.props.info._id,
            item: {
                title: "",
                description: "",
                author: "Tester McTestFace"      // get from login
            }
        };
    },

    addItem: function(e) {
        e.preventDefault();
        item = this.state.item
        this.setState({ item: item })
        actions.addItem(this.state);

        // RESETS THE FORM
        item.title = "";
        item.description = "";
        this.setState({ item: item })
    },

    handleInputChange: function(e) {
        e.preventDefault();
        var name = e.target.name;
        var value = e.target.value;
        var item = this.state.item;
        item[name] = value;
        this.setState({item: item});
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
                              <p className="help-block">Include publication details, links, and other useful information.</p>

                    </div>
                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
            </div>
        )
    }
});
