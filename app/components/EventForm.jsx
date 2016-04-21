var React = require('react');
var actions = require('../actions/EventActions');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            name: "",
            location: "",
            date: "",
            description: "",
            owner: ""
        };
    },

    addEvent: function(e) {
        e.preventDefault();
        actions.addEvent(this.state);
    },

    handleInputChange: function(e) {
        e.preventDefault();
        var name = e.target.name;
        var state = this.state;
        state[name] = e.target.value;
        this.setState(state);
    },

    render: function() {
        return (
            <div className = 'container'>

                <div className = 'row'>
                    <div className = 'col-md-8 col-md-offset-2 holder'>
                        <form>
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
                                <p className="help-block">You can give more specific information in the details below</p>
                                <input type="text" className="form-control"
                                       id="location"
                                       name = 'location'
                                       placeholder="City"
                                       value = { this.state.location }
                                       onChange = { this.handleInputChange } />
                            </div>
                            <div className="form-group">
                                <label className = 'control-label' HTMLfor="date">Date of the event</label>
                                <input type="text" className="form-control"
                                       id="date"
                                       name = 'date'
                                       placeholder="Date"
                                       value = { this.state.date }
                                       onChange = { this.handleInputChange } />

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
