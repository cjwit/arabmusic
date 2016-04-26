var React = require('react');
var actions = require('../actions/EventActions');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            name: "",
            location: "",
            date: new Date(Date.now()),
            description: "",
            owner: "Evan the Event Adder"           // get from login
        };
    },

    componentDidMount: function () {
        $(function () {
            $('#date').datetimepicker({
                format: "MM/DD/YYYY"
            })
        });
    },

    addEvent: function(e) {
        e.preventDefault();
        actions.addEvent(this.state);
        this.setState({
            name: "",
            location: "",
            date: new Date(Date.now()),
            description: ""
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

        var state = this.state;
        state[name] = value;

        this.setState(state);
    },

    render: function() {
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
                                          value = { this.state.description }
                                          onChange = { this.handleInputChange } />
                            </div>
                            <button type="submit" className="btn btn-default">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
});
