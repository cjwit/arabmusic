var React = require('react');
var actions = require('../actions/NoticeActions');
var tags = require('../tags.js');

module.exports = React.createClass({
    getInitialState: function() {
        return ({
            editing: false,
            info: {
                name: this.props.info.name,
                location: this.props.info.location,
                description: this.props.info.description,
                link: this.props.info.link,
                postDate: new Date(this.props.info.postDate),
                owner: this.props.info.owner,
                eventDate: new Date(this.props.info.eventDate),
                tags: this.props.info.tags,
                edited: this.props.info.edited,
                editDate: new Date(this.props.info.editDate)
            }
        })
    },

    editNotice: function(e) {
        e.preventDefault();
        var info = this.state.info;
        info.id = this.props.info._id;
        info.edited = true;
        info.editDate = new Date(Date.now());
        actions.editNotice(info);
        this.setState({ editing: false });
    },

    openForm: function() {
        this.setState({ editing: true })
        var date = new Date(this.props.info.eventDate)

        // wait for rendering to complete
        var toggleTag = this.toggleTag;
        window.requestAnimationFrame(function() {
            // set up form
            $('#tags :input').change(function() {
                toggleTag(this.name);
            })

            $(function () {
                var datePicker = $('#eventDate');
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

    // this may need to be edited to work with just the ID
    deleteNotice: function(e) {
        e.preventDefault();
        actions.deleteNotice(this.props.info._id)
        // redirect if on detail page
        var path = window.location.pathname;
        var split = path.split('/')
        var folder = split[1]

        // change if notices get their own page
        if (folder = 'notices') {
            folder = 'resources';
        }

        var id = split[2] || null
        if (id != null) {
            window.location.href = '/' + folder;
        }
    },

    handleInputChange: function(e) {
        e.preventDefault();
        var name = e.target.name;
        if (name === 'eventDate') {
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
        var noticePage = Boolean(window.location.pathname.match(/^\/notices\/\w/));

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
                <div className = 'notice' id = { id }>
                    {
                        props.link === "" ?
                        <span className = 'notice-name'>
                            { props.name }&nbsp;
                        </span>
                        :
                        <a href = { props.link } target = "_blank">
                            <span className = 'notice-name'>
                                { props.name }:&nbsp;
                            </span>
                        </a>
                    }
                    { !noticePage ?
                        <div className = 'btn-group pull-right' role = 'group' aria-label='...'>
                            <a href= { '/notices/' + id } className = 'btn btn-default'>
                                <span className="glyphicon glyphicon-zoom-in" aria-hidden="true"></span>
                            </a>
                        </div>
                            :
                        <div className = 'btn-group pull-right' role = 'group' aria-label='...'>
                            <a onClick = { this.openForm } className = 'btn btn-default'>
                                <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                            </a>
                            <a onClick = { this.deleteNotice } className = 'btn btn-default'>
                                <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                            </a>
                        </div>
                    }
                    <p>
                        {
                            props.eventDate !== null ?
                            <span className = 'notice-date'>
                                { new Date(props.eventDate).toLocaleDateString() },&nbsp;
                            </span>
                            :
                            null
                        }
                        {
                            props.location !== "" ?
                            <span className = 'notice-location'>
                                { props.location }
                            </span>
                            :
                            null
                        }
                    </p>
                    <div className = 'notice-description'>
                        { props.description }
                        { props.edited && noticePage ?
                            <p>(Edited on { new Date(props.editDate).toLocaleDateString() })</p>
                            : null
                        }
                    </div>
                    { props.tags.length > 0 ?
                        <div className = 'notice-tags'>
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
                <div className = 'notice' id = { id }>
                    <form onSubmit = { this.editNotice } id = 'editNoticeForm'>
                        <div className="form-group">
                            <label className = 'control-label' HTMLfor="title">Edit</label>
                            <input type="text" className="form-control"
                                   id="name"
                                   name = "name"
                                   placeholder="Name or Title"
                                   defaultValue = { props.name }
                                   onChange = { this.handleInputChange } />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control"
                                   id="location"
                                   name = "location"
                                   placeholder="Location"
                                   defaultValue = { props.location }
                                   onChange = { this.handleInputChange } />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control"
                                   id="link"
                                   name = "link"
                                   placeholder="link"
                                   defaultValue = { props.link }
                                   onChange = { this.handleInputChange } />
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control"
                                   id="eventDate"
                                   name = "eventDate"
                                   placeholder = "Event Date"
                                   onChange = { this.handleInputChange } />
                        </div>
                        <div className="form-group">
                            <textarea className="form-control" rows = "3"
                                      id="description"
                                      name = "description"
                                      defaultValue = { props.description }
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
