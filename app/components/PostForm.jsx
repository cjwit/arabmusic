var React = require('react');
var actions = require('../actions/PostActions');
var tags = require('../tags.js');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            title: "",
            date: new Date(Date.now()),
            content: "",
            tags: [],
            ownerName: "",
            owner: "",
            comments: []
        };
    },

    componentDidMount: function () {
        var toggleTag = this.toggleTag;
        $('#tags :input').change(function() {
            toggleTag(this.name);
        })

        // validation setup
        var submit = $('#submit');
        submit.prop('disabled', true)
    },

    componentWillReceiveProps: function(newProps) {
        if (newProps.login.status === true) {
            this.setState({
                owner: newProps.login.user._id,
                ownerName: newProps.login.user.name
            })
            $('#author').attr('value', newProps.login.user.name)
        }
    },

    addPost: function(e) {
        e.preventDefault();
        var info = this.state;
        info.edited = false;
        var now = new Date(Date.now());
        info.editDate = now;
        info.date = now;
        console.log(info)
        actions.addPost(info);
        this.setState({
            title: "",
            date: now,
            content: "",
            tags: []
        })
    },

    handleInputChange: function(e) {
        e.preventDefault();
        var name = e.target.name;
        var value = e.target.value;
        var state = this.state;
        state[name] = value;
        this.setState(state);

        // validate element to set class
        var element = $("#" + name);
        var condition = false;
        var toValidate = false;

        switch (name) {
            case "title":
                condition = value.length > 0;
                toValidate = true;
                break;
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
            title = this.state.title.length > 0,
            content = this.state.content.length > 0,
            valid = title && content && this.props.login.status;
        if (valid) {
            submit.prop('disabled', false);
        } else {
            submit.prop('disabled', true);
        }
    },

    toggleTag: function(name) {
        var tags = this.state.tags;
        var index = tags.indexOf(name)
        if (index === -1) {
            tags.push(name);
        } else {
            tags.splice(index, 1);
        }
        this.setState({
            tags: tags
        })
    },

    render: function() {
        var tagButtons = [];
        var allTags = tags.geographic.concat(tags.musical).concat(tags.conceptual);
		var toggleTag = this.toggleTag;
        allTags.map(function(tag, index) {
            tagButtons.push(
                <label className = 'tag btn btn-default btn-xs' onChange = { toggleTag } key = { 'check' + tag }>
                    <input type = 'checkbox' name = { tag } autocomplete='off' /> { tag }
                </label>)
        });

        return (
            <div id = 'addPostForm'>
                <form onSubmit = { this.addPost } >
                    <div className="form-group">
                        <label className = 'control-label' HTMLfor="title">Title or Subject</label>
                        <input type="text" className="form-control"
                               id="title"
                               name = 'title'
                               placeholder="Title"
                               value = { this.state.title }
                               onChange = { this.handleInputChange } />
                               <p className="help-block">Required</p>
                    </div>
                    <div className="form-group">
                        <label className = 'control-label' HTMLfor="author">Author</label>
                        <input type="text" className="form-control"
                               id="author"
                               name = 'author'
                               placeholder="Author"
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
                                  <p className="help-block">Required</p>
                    </div>
                    <div className="form-group">
                        <label className = 'control-label'>Select Tags</label>
                        <div id = 'tags' class = 'btn-group' data-toggle='buttons'>
                            { tagButtons }
                        </div>
                    </div>

                    <button id = "submit" type="submit" className="btn btn-default">Submit</button>
                </form>
            </div>
        )
    }
});
