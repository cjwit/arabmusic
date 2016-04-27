var React = require('react');
var actions = require('../actions/EventActions');

module.exports = React.createClass({
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
        // actions.editEvent(this.props.info)
    },

    render: function() {
        var info = this.props.info;
        var id = info._id;
        var eventPage = Boolean(window.location.pathname.match(/^\/events\//));
        var tagString = '';
        info.tags.map(function(tag, index) {
            if (index === info.tags.length - 1) {
                tagString += tag;
            } else {
                tagString += tag + ', ';
            }
        })

        return (
            <div className = 'event' id = { id }>
                <span className = 'event-name'>
                    { info.name }:&nbsp;
                </span>

                { info.location ? <span className = 'event-place'>{ info.location },&nbsp;</span> : null }

                <span className = 'event-date'>
                    { info.date.toLocaleDateString() }
                </span>
                    { !eventPage ?
                    <div className = 'btn-group pull-right' role = 'group' aria-label='...'>

                        <a href = { '/events/' + id } role = 'button' className = 'btn btn-default'>
                            <span className="glyphicon glyphicon-zoom-in" aria-hidden="true"></span>
                        </a>
                    </div>
                        :
                    <div className = 'btn-group pull-right' role = 'group' aria-label='...'>
                        <a onClick = { this.editEvent } role = 'button' className = 'btn btn-default'>
                            <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                        </a>
                        <a onClick = { this.deleteEvent } role = 'button' className = 'btn btn-default'>
                            <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        </a>
                    </div>
                }
                <br />

                <div className = 'event-description'>
                    { info.description }
                </div>
                { info.tags.length > 0 ?
                    <div className = 'event-tags'>
                        <span className = 'glyphicon glyphicon-tag' aria-hidden = 'true'></span>&nbsp;
                        { tagString }
                    </div>
                    : null
                }
            </div>
            )
    }
})
