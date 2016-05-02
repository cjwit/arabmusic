var React = require('react');
var actions = require('../actions/PostActions');

module.exports = React.createClass({
    getInitialState: function() {
        return ({
            editing: false,
            info: {
                author: this.props.info.author,
                content: this.props.info.content,
                date: new Date(this.props.info.date),
                editDate: new Date(this.props.info.editDate),
                edited: this.props.info.edited,
                id: this.props.info.id
            }
        })
    },

    deleteComment: function(e) {
        e.preventDefault();
        var payload = {
            discussionID: this.props.discussionID,
            comment: this.state.info
        }
        actions.deleteComment(payload)
    },

    openForm: function(e) {
        e.preventDefault();
        this.setState({ editing: true })
    },

    closeForm: function(e) {
        e.preventDefault();
        this.setState({ editing: false });
    },

    editComment: function(e) {
        e.preventDefault();
        var info = this.state.info;
        info.edited = true;
        info.editDate = new Date(Date.now());
        var payload = {
            discussionID: this.props.discussionID,
            comment: info
        }
        console.log(payload);
        actions.editComment(payload)
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
        var info = this.state.info;
        console.log(info);
        var discussionPage = Boolean(window.location.pathname.match(/^\/discussions\/\w/));

        if (this.state.editing) {
            return (
                <div className = 'comment'>
                    <form onSubmit = { this.editComment } id = 'editCommentForm'>
                        <div className="form-group">
                            <label className = 'control-label' HTMLfor="title">Edit Your Comment</label>
                            <textarea className="form-control" rows = "3"
                                      id="content"
                                      name = 'content'
                                      defaultValue = { info.content }
                                      onChange = { this.handleInputChange } />
                        </div>
                        <button type="submit" className="btn btn-default">Submit</button>&nbsp;
                        <button className="btn btn-danger" onClick = { this.closeForm }>Cancel</button>
                    </form>
                </div>

            )
        } else {
            return (
                <div className = 'comment'>
                    <span className = 'comment-author'>
                        { info.author },&nbsp;
                    </span>
                    <span className = 'comment-date'>
                        { info.date.toLocaleDateString() }:&nbsp;
                    </span>

                    { discussionPage ?

                        <div className = 'btn-group pull-right' role = 'group' aria-label='...'>
                            <a onClick = { this.openForm } className = 'btn btn-default'>
                                <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                            </a>
                            <a onClick = { this.deleteComment } className = 'btn btn-default'>
                                <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                            </a>
                        </div>
                        : null
                    }

                    <span className = 'comment-content'>
                        { info.content }
                        { info.edited ?
                            <p>(Edited on { info.editDate.toLocaleDateString() })</p>
                            : null
                        }
                    </span>

                </div>
            )
        }
    }
})
