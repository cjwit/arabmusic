var React = require('react');

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


    render: function() {
        return (
            <div className = 'container'>

                <div className = 'row'>
                    <div className = 'col-md-8 col-md-offset-2 holder'>
                        <form>
                            <div className="form-group">
                                <label HTMLfor="eventTitle">Title of the event</label>
                                <input type="text" className="form-control" id="eventTitle" placeholder="Title" />
                            </div>
                            <div className="form-group">
                                <label HTMLfor="eventLocation">City, State or Province, and Country</label>
                                <p className="help-block">You can give more specific information in the details below</p>
                                <input type="text" className="form-control" id="eventLocation" placeholder="City" />
                            </div>
                            <div className="form-group">
                                <label HTMLfor="eventDate">Date of the event</label>
                                <input type="text" className="form-control" id="eventDate" placeholder="Date" />
                            </div>
                            <div className="form-group">
                                <label HTMLfor="eventDescription">Some information, including a contact for anyone who has more questions</label>
                                <textarea className="form-control" rows = "3" id="eventDescription" placeholder="Details and contact information" />
                            </div>
                            <button type="submit" className="btn btn-default">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
});
