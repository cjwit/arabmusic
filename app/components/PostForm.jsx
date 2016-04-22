var React = require('react');
var actions = require('../actions/PostActions');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            title: "",
            author: "Tester McTesty", // Grab from username
            date: new Date(Date.now()),
            content: "",
            comments: []
        };
    },

    addPost: function(e) {
        e.preventDefault();
        this.setState({
            date: new Date(Date.now())
        })
        actions.addPost(this.state);
        this.setState({
            title: "",
            date: new Date(Date.now()),
            content: ""
        })
    },

    handleInputChange: function(e) {
        e.preventDefault();
        var name = e.target.name;
        var value = e.target.value;
        var state = this.state;
        state[name] = value;
        this.setState(state);
    },

    render: function() {
        return (
            <div id = 'addPostContainer'>
                <div id = 'fixedDiv'>
                <form onSubmit = { this.addPost } id = 'addPostForm'>
                    <div className="form-group">
                        <label className = 'control-label' HTMLfor="title">Title or Subject</label>
                        <input type="text" className="form-control"
                               id="title"
                               name = 'title'
                               placeholder="Title"
                               value = { this.state.title }
                               onChange = { this.handleInputChange } />
                    </div>
                    <div className="form-group">
                        <label className = 'control-label' HTMLfor="author">Author</label>
                        <input type="text" className="form-control"
                               id="author"
                               name = 'author'
                               placeholder="Author"
                               value = { this.state.author }
                               onChange = { this.handleInputChange }
                               disabled />
                        <p className="help-block">Log out and back in again to change authorship.</p>
                    </div>
                    <div className="form-group">
                        <textarea className="form-control" rows = "3"
                                  id="content"
                                  name = 'content'
                                  placeholder="You can change the size of this box by dragging the lower-right corner."
                                  value = { this.state.content }
                                  onChange = { this.handleInputChange } />
                    </div>
                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
            </div>
            </div>
        )
    }
});
