var React = require('react');
var actions = require('../actions/EventActions');
var tags = require('../tags.js');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            name: "",
            location: "",
            date: new Date(Date.now()),
            description: "",
            tags: [],
            owner: this.props.login.user._id,
            contactName: this.props.login.user.name,
            contactEmail: this.props.login.user.email           // get from login
        };
    },

    componentDidMount: function () {
        $(function () {
            $('#date').datetimepicker({
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

    addEvent: function(e) {
        e.preventDefault();
        var info = this.state;
        info.edited = false;
        var now = new Date(Date.now());
        info.editDate = now;
        actions.addEvent(info);
    },

    handleInputChange: function(e) {
        e.preventDefault();
        var name = e.target.name;
        if (name === 'date') {
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
            case "date":
                condition = typeof value === 'object';
                break;
            case "location":
                condition = value.length > 1;
                break;
            case "description":
                condition = value.length > 1;
                break;
            case "contactEmail":
                condition = value.length === 0 || value.indexOf('@') !== -1;
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
            location = this.state.location.length > 1,
            description = this.state.description.length > 1,
            valid = name && location && date && description;
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
                        <form onSubmit = { this.addEvent } id = 'addEventForm'>
                            <div className="form-group">
                                <label className = 'control-label' HTMLfor="name">Title of the event</label>
                                <input type="text" className="form-control"
                                       id="name"
                                       name = 'name'
                                       placeholder="Title"
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
                                   <p className="help-block">Use the description to provide more details (Required)</p>
                            </div>
                            <div className="form-group">
                                <label className = 'control-label' HTMLfor="date">Date of the event</label>
                                <input type="text" className="form-control"
                                       id="date"
                                       name = 'date'
                                       onBlur = { this.handleInputChange } />
                                   <p className="help-block">Use the description to provide times, defaults to today</p>
                            </div>
                            <div className="form-group">
                                <label className = 'control-label' HTMLfor="description">Description of the event</label>
                                <textarea className="form-control" rows = "3"
                                          id="description"
                                          name = 'description'
                                          placeholder="Details and contact information"
                                          value = { this.state.description }
                                          onChange = { this.handleInputChange } />
                                      <p className="help-block">Required</p>
                            </div>
                            <div className="form-group">
                                <label className = 'control-label' HTMLfor="description">Contact name</label>
                                <input type = "text" className="form-control"
                                          id="contactName"
                                          name = 'contactName'
                                          placeholder= { this.state.contactName }
                                          value = { this.state.contactName }
                                          onChange = { this.handleInputChange } />
                                      <p className="help-block">This is drawn from your login information, but you are free to change it</p>
                            </div>
                            <div className="form-group">
                                <label className = 'control-label' HTMLfor="description">Contact email</label>
                                <input type = "text" className="form-control"
                                          id="contactEmail"
                                          name = 'contactEmail'
                                          placeholder= { this.state.contactEmail }
                                          value = { this.state.contactEmail }
                                          onChange = { this.handleInputChange } />
                                      <p className="help-block">This is drawn from your login information, but you are free to change it</p>
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
