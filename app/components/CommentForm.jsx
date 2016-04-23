var React = require('react');
var postActions = require('../actions/PostActions');
var pageActions = require('../actions/PageActions');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            discussionID: this.props.id,
            comment: {
                author: "Tester's Big Brother", // Grab from username
                date: new Date(Date.now()),
                content: ""
            }
        };
    },

    addComment: function(e) {
        e.preventDefault();
        comment = this.state.comment
        comment.date = new Date(Date.now());
        this.setState({ comment: comment })
        postActions.addComment(this.state);
        pageActions.openDiscussion(this.props.info);

        // reset form
        comment.content = ''
        this.setState({ comment: comment })
    },

    handleInputChange: function(e) {
        e.preventDefault();
        var name = e.target.name;
        var value = e.target.value;
        var comment = this.state.comment;
        comment[name] = value;
        this.setState({comment: comment});
    },

    render: function() {
        return (
            <div id = 'addCommentForm'>
                <form onSubmit = { this.addComment } >
                    <div className="form-group">
                        <label className = 'control-label' HTMLfor="author">Comment</label>
                        <input type="text" className="form-control"
                               id="author"
                               name = 'author'
                               placeholder="Author"
                               value = { this.state.comment.author }
                               onChange = { this.handleInputChange }
                               disabled />
                        <p className="help-block">Log out and back in again to change authorship.</p>
                    </div>
                    <div className="form-group">
                        <textarea className="form-control" rows = "3"
                                  id="content"
                                  name = 'content'
                                  placeholder="You can change the size of this box by dragging the lower-right corner."
                                  value = { this.state.comment.content }
                                  onChange = { this.handleInputChange } />
                    </div>
                    <button type="submit" className="btn btn-default">Submit</button>
                </form>
            </div>
        )
    }
});
