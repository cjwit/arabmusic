var React = require('react');
var actions = require('../actions/EventActions');
var tags = require('../tags.js');

module.exports = React.createClass({
    getInitialState: function() {
        return ({
            editing: false,
            info: {
                name: this.props.info.name,
                location: this.props.info.location,
                description: this.props.info.description,
                date: new Date(this.props.info.date),
                tags: this.props.info.tags,
                owner: this.props.info.owner,
                id: this.props.info._id,
                edited: this.props.info.edited,
                editDate: new Date(this.props.info.editDate)
            }
        })
    },

    deleteEvent: function(e) {
        e.preventDefault();
        actions.deleteEvent(this.props.info)

        // redirect if on detail page
        var path = window.location.pathname;
        var split = path.split('/')
        var folder = split[1]
        var id = split[2] || null
        if (id != null) {
            window.location.href = '/' + folder;
        }
    },

    editEvent: function(e) {
        e.preventDefault();
        var info = this.state.info;
        info.edited = true;
        info.editDate = new Date(Date.now());
        actions.editEvent(info);
        this.setState({ editing: false });
    },

    openForm: function() {
        this.setState({ editing: true })
        var date = new Date(this.props.info.date)

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
        var eventID = props._id;

        // create owner management buttons if necessary
        var ownerID = "",
            myEvent = false;
        console.log(this.props.login);
        
        if (this.props.login.status === true) {
            ownerID = this.props.login.user._id;
        }

        if (ownerID !== "" && ownerID === props.owner) {
            myEvent = true;
        }

        var ownerButtons = null;
        if (myEvent === true) {
            ownerButtons = <div className = 'btn-group pull-right' role = 'group' aria-label='...'>
                <a onClick = { this.openForm } role = 'button' className = 'btn btn-default'>
                    <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                </a>
                <a onClick = { this.deleteEvent } role = 'button' className = 'btn btn-default'>
                    <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                </a>
            </div>
        }

        var eventPage = Boolean(window.location.pathname.match(/^\/events\/\w/));

        // set tags
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
                <div className = 'event' id = { eventID }>
                    <span className = 'event-name'>
                        { props.name }&nbsp;
                    </span>

                    { props.location ? <span className = 'event-place'>{ props.location },&nbsp;</span> : null }

                    <span className = 'event-date'>
                        { new Date(props.date).toLocaleDateString() }
                    </span>
                        { !eventPage ?
                        <div className = 'btn-group pull-right' role = 'group' aria-label='...'>

                            <a href = { '/events/' + eventID } role = 'button' className = 'btn btn-default'>
                                <span className="glyphicon glyphicon-zoom-in" aria-hidden="true"></span>
                            </a>
                        </div>
                            :
                        <div className = 'pull-right'>{ ownerButtons }</div>
                    }
                    <br />

                    <div className = 'event-description'>
                        { props.description }
                        { props.edited && eventPage ?
                            <p>(Edited on { new Date(props.editDate).toLocaleDateString() })</p>
                            : null
                        }
                    </div>
                    { props.tags.length > 0 ?
                        <div className = 'event-tags'>
                            <span className = 'glyphicon glyphicon-tag' aria-hidden = 'true'></span>&nbsp;
                            { tagString }
                        </div>
                        : null
                    }
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
                <div className = 'event' id = { eventID }>
                    <form onSubmit = { this.editEvent } id = 'editEventForm'>
                        <div className="form-group">
                            <label className = 'control-label' HTMLfor="name">Title of the event</label>
                            <input type="text" className="form-control"
                                   id="name"
                                   name = 'name'
                                   placeholder="Title"
                                   defaultValue = { props.name }
                                   onChange = { this.handleInputChange } />
                        </div>
                        <div className="form-group">
                            <label className = 'control-label' HTMLfor="location">City, State or Province, and Country</label>
                            <input type="text" className="form-control"
                                   id="location"
                                   name = 'location'
                                   placeholder="City"
                                   defaultValue = { props.location }
                                   onChange = { this.handleInputChange } />
                            <p className="help-block">Use the description to provide more details</p>
                        </div>
                        <div className="form-group">
                            <label className = 'control-label' HTMLfor="date">Date of the event</label>
                            <input type="text" className="form-control"
                                   id="date"
                                   name = 'date'
                                   onBlur = { this.handleInputChange } />
                            <p className="help-block">Use the description to provide times</p>
                        </div>
                        <div className="form-group">
                            <label className = 'control-label' HTMLfor="description">Some information, including a contact for anyone who has more questions</label>
                            <textarea className="form-control" rows = "3"
                                      id="description"
                                      name = 'description'
                                      placeholder="Details and contact information"
                                      defaultValue = { props.description }
                                      onChange = { this.handleInputChange } />
                        </div>
                        <div className="form-group">
                            <label className = 'control-label'>Select Tags</label>
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
