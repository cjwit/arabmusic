var React = require('react');
var actions = require('../actions/NoticeActions');
var tags = require('../tags.js');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            name: "",
            location: "",
            description: "",
            link: "http://",
            eventDate: null,
            tags: [],
            owner: "Ned the Noticer"           // get from login
        };
    },

    componentDidMount: function () {
        $(function () {
            $('#eventDate').datetimepicker({
                format: "MM/DD/YYYY"
            })
        });
        var toggleTag = this.toggleTag;
        $('#tags :input').change(function() {
            toggleTag(this.name);
        })

        // validation setup
        var submit = $('#submit');
        submit.prop('disabled', true)
    },

    addNotice: function(e) {
        e.preventDefault();
        var info = this.state;
        info.edited = false;
        var now = new Date(Date.now());
        info.editDate = now;
        info.postDate = now;

        // check link format
        if (info.link === "http://") {
            info.link = "";
        } else if (!info.link.match(/^http/)) {
            info.link = "http://" + info.link;
        }

        actions.addNotice(info);
    },

    handleInputChange: function(e) {
        e.preventDefault();
        var name = e.target.name;
        if (name === 'eventDate') {
            var value = new Date(e.target.value);
        } else {
            var value = e.target.value;
        }
        var state = this.state;
        state[name] = value;
        this.setState(state);

        // validate element to set class
        var element = $("#" + name);
        var condition = false;
        switch (name) {
            case "name":
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
            name = this.state.name.length > 1,
            description = this.state.description.length > 1,
            valid = name && description;
        if (valid) {
            submit.prop('disabled', false);
        } else {
            submit.prop('disabled', true);
        }
    },

    toggleTag: function(name) {
        var tags = this.state.tags;
        var index = tags.indexOf(name);
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
        allTags.map(function(tag, index) {
            tagButtons.push(
                <label className = 'tag btn btn-default btn-xs' onChange = { this.toggleTag } key = { 'check' + tag }>
                    <input type = 'checkbox' name = { tag } autocomplete='off' /> { tag }
                </label>)
        });

        return (
            <div className = 'container'>
                <div className = 'row'>
                    <div className = 'col-md-8 col-md-offset-2'>
                        <form onSubmit = { this.addNotice } id = 'addNoticeForm'>
                            <div className="form-group">
                                <label className = 'control-label' HTMLfor="name">Name or Title</label>
                                <input type="text" className="form-control"
                                       id="name"
                                       name = 'name'
                                       placeholder="Name or Title"
                                       value = { this.state.name }
                                       onChange = { this.handleInputChange } />
                                       <p className="help-block">Required</p>
                            </div>
                            <div className="form-group">
                                <label className = 'control-label' HTMLfor="location">City, State or Province, and Country</label>
                                <input type="text" className="form-control"
                                       id="location"
                                       name = 'location'
                                       placeholder="City"
                                       value = { this.state.location }
                                       onChange = { this.handleInputChange } />
                                <p className="help-block">Use the description to provide more details</p>
                            </div>
                            <div className="form-group">
                                <label className = 'control-label' HTMLfor="eventDate">Date of the event</label>
                                <input type="text" className="form-control"
                                       id="eventDate"
                                       name = 'eventDate'
                                       onBlur = { this.handleInputChange } />
                                <p className="help-block">Use the description to provide times, or leave blank</p>
                            </div>
                            <div className="form-group">
                                <label className = 'control-label' HTMLfor="description">Some information, including a contact for anyone who has more questions</label>
                                <textarea className="form-control" rows = "3"
                                          id="description"
                                          name = 'description'
                                          placeholder="Details and contact information"
                                          value = { this.state.description }
                                          onChange = { this.handleInputChange } />
                                          <p className="help-block">Required</p>
                            </div>
                            <div className="form-group">
                                <label className = 'control-label' HTMLfor="link">Link to more information, if you have one</label>
                                <input type="text" className="form-control"
                                       id="link"
                                       name = 'link'
                                       placeholder="Link"
                                       value = { this.state.link }
                                       onChange = { this.handleInputChange } />
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
                </div>
            </div>
        )
    }
});
