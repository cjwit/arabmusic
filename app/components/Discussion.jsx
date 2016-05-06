var React = require('react');
var Comment = require('./Comment.jsx');
var actions = require('../actions/PostActions');
var tags = require('../tags.js');

module.exports = React.createClass({
    getInitialState: function() {
        return ({
            editing: false,
            info: {
                title: this.props.info.title,
                author: this.props.info.author,
                content: this.props.info.content,
                date: new Date(this.props.info.date),
                tags: this.props.info.tags,
                edited: this.props.info.edited,
                editDate: new Date(this.props.info.editDate)
            }
        })
    },

    editPost: function(e) {
        e.preventDefault();
        var info = this.state.info;
        info.comments = this.props.info.comments;
        info.id = this.props.info._id;
        info.edited = true;
        info.editDate = new Date(Date.now());

        actions.editPost(info);
        this.setState({ editing: false });
    },

    openForm: function() {
        this.setState({ editing: true })
        var date = this.props.info.date

        // wait for rendering to complete
        var toggleTag = this.toggleTag;
        window.requestAnimationFrame(function() {
            // set up form
            $('#tags :input').change(function() {
                toggleTag(this.name);
            })

            $(function () {
                var datePicker = $('#date');
                datePicker.datetimepicker({
                    format: "MM/DD/YYYY"
                })
                datePicker.data('DateTimePicker').date(date)
            });
        })
    },

    closeForm: function(e) {
        e.preventDefault();
        this.setState({ editing: false });
    },

    toggleTag: function(name) {
        var info = this.state.info;
        var index = info.tags.indexOf(name)
        if (index === -1) {
            info.tags.push(name);
        } else {
            info.tags.splice(index, 1);
        }
        this.setState({
            info: info
        })
    },

    deletePost: function(e) {
        e.preventDefault();
        var info = this.state.info;
        info.id = this.props.info._id;
        actions.deletePost(info)

        // redirect if on detail page
        var path = window.location.pathname;
        var split = path.split('/')
        var folder = split[1]
        var id = split[2] || null
        if (id != null) {
            window.location.href = '/' + folder;
        }
    },

    handleInputChange: function(e) {
        e.preventDefault();
        var name = e.target.name;
        if (name === 'date') {
            var value = new Date(e.target.value);
        } else {
            var value = e.target.value;
        }

        var info = this.state.info;
        info[name] = value;

        this.setState({
            info: info
        });
    },

    render: function() {
        var props = this.props.info;
        var id = props._id;
        var discussionPage = Boolean(window.location.pathname.match(/^\/discussions\/\w/));

        var comments = [];
        if (props.comments.length > 0) {
            props.comments.forEach(function(c, index) {
                comments.push(<Comment info = { c.comment } discussionID = { id } key = { 'comment' + index }/>)
            });
        }
        var tagString = '';
        props.tags.map(function(tag, index) {
            if (index === props.tags.length - 1) {
                tagString += tag;
            } else {
                tagString += tag + ', ';
            }
        })

        if (!this.state.editing) {
            return (
                <div className = 'discussion' id = { id }>
                    <span className = 'discussion-title'>
                        { props.title }&nbsp;
                    </span>
                    <span className = 'discussion-author'>
                        { props.author },&nbsp;
                    </span>
                    <span className = 'discussion-date'>
                        { props.date.toLocaleDateString() }
                    </span>
                    
                    { !discussionPage ?
                        <div className = 'btn-group pull-right' role = 'group' aria-label='...'>
                            <a href= { '/discussions/' + id } className = 'btn btn-default'>
                                <span className="glyphicon glyphicon-zoom-in" aria-hidden="true"></span>
                            </a>
                        </div>
                            :
                        <div className = 'btn-group pull-right' role = 'group' aria-label='...'>
                            <a onClick = { this.openForm } className = 'btn btn-default'>
                                <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                            </a>
                            <a onClick = { this.deletePost } className = 'btn btn-default'>
                                <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                            </a>
                        </div>
                    }

                    <div className = 'discussion-content'>
                        { props.content }
                        { props.edited && discussionPage ?
                            <p>(Edited on { new Date(props.editDate).toLocaleDateString() })</p>
                            : null
                        }
                    </div>
                    { props.tags.length > 0 ?
                        <div className = 'discussion-tags'>
                            <span className = 'glyphicon glyphicon-tag' aria-hidden = 'true'></span>&nbsp;
                            { tagString }
                        </div>
                        : null
                    }
                    { comments }
                </div>
            )
        } else {
            var tagButtons = [];
            var allTags = tags.geographic.concat(tags.musical).concat(tags.conceptual);
            allTags.map(function(tag, index) {
                var preChecked = (props.tags.indexOf(tag) !== -1)
                tagButtons.push(
                    <label className = { preChecked ? 'tag btn btn-default btn-xs active' : 'tag btn btn-default btn-xs' }
                           onChange = { this.toggleTag }
                           key = { 'check' + tag }>
                        <input type = 'checkbox'
                               name = { tag }
                               autocomplete='off'
                               defaultChecked = { preChecked } /> { tag }
                    </label>)
            });
            return (
                <div className = 'discussion' id = { id }>
                    <form onSubmit = { this.editPost } id = 'editPostForm'>
                        <div className="form-group">
                            <label className = 'control-label' HTMLfor="title">Edit Your Post</label>
                            <input type="text" className="form-control"
                                   id="title"
                                   name = 'title'
                                   placeholder="Title"
                                   defaultValue = { props.title }
                                   onChange = { this.handleInputChange } />
                        </div>
                        <div className="form-group">
                            <textarea className="form-control" rows = "3"
                                      id="content"
                                      name = 'content'
                                      defaultValue = { props.content }
                                      onChange = { this.handleInputChange } />
                        </div>
                        <div className="form-group">
                            <div id = 'tags' class = 'btn-group' data-toggle='buttons'>
                                { tagButtons }
                            </div>
                        </div>

                        <button type="submit" className="btn btn-default">Submit</button>&nbsp;
                        <button className="btn btn-danger" onClick = { this.closeForm }>Cancel</button>
                    </form>
                </div>
            )
        }
    }
})
