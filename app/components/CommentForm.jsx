var React = require('react');
var postActions = require('../actions/PostActions');
var Guid = require('guid');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            discussionID: this.props.info._id,
            comment: {
                ownerName: "",
                owner: "",
                date: new Date(Date.now()),
                content: ""
            }
        };
    },

    componentDidMount: function () {
        // validation setup
        var submit = $('#submit');
        submit.prop('disabled', true)
    },

    componentWillReceiveProps: function(newProps) {
        if (newProps.login.status === true) {
            var comment = this.state.comment;
            comment.owner = newProps.login.user._id;
            comment.ownerName = newProps.login.user.name
            this.setState({ comment: comment });
            $('#author').attr('value', newProps.login.user.name)
        }
    },

    addComment: function(e) {
        e.preventDefault();
        comment = this.state.comment
        comment.edited = false;
        var now = new Date(Date.now());
        comment.editDate = now;
        comment.date = now;

        comment.id = Guid.raw();
        this.setState({ comment: comment })
        postActions.addComment(this.state);

        // reset the comment form
        comment.content = "";
        this.setState({ comment: comment })
    },

    handleInputChange: function(e) {
        e.preventDefault();
        var name = e.target.name;
        var value = e.target.value;
        var comment = this.state.comment;
        comment[name] = value;
        this.setState({comment: comment});

        // validate element to set class
        var element = $("#" + name);
        var condition = false;
        var toValidate = false;

        switch (name) {
            case "content":
                condition = value.length > 0;
                toValidate = true;
                break;
            default:
                break;
        }

        if (toValidate) {
            if (condition) {
                element.parent().removeClass('has-error').addClass('has-success')
            } else {
                element.parent().removeClass('has-success').addClass('has-error')
            }
        }
        this.validateForm();
    },

    validateForm: function() {
        // set submit button
        var submit = $('#submit'),
            content = this.state.comment.content.length > 0,
            valid = content && this.props.login.status;
        if (valid) {
            submit.prop('disabled', false);
        } else {
            submit.prop('disabled', true);
        }
    },

    render: function() {
        return (
            <div id = 'addCommentForm'>
                <form onSubmit = { this.addComment } >
                    <div className="form-group">
                        <label className = 'control-label' HTMLfor="ownerName">Comment</label>
                        <input type="text" className="form-control"
                               id="ownerName"
                               name = 'ownerName'
                               placeholder="Author"
                               value = { this.state.comment.ownerName }
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
                    <button id = "submit" type="submit" className="btn btn-default">Submit</button>
                </form>
            </div>
        )
    }
});
