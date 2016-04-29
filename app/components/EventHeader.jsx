var React = require('react');

module.exports = React.createClass({
    render: function() {
        return (
            <div id = 'event-header' className = 'head row'>
                <div className = 'col-md-8 col-md-offset-2 holder'>
                    <h1>Arab Music Events</h1>
                    <p>
                        Share news on events that are happening in your area. Add information and
                        be sure to include details so anyone who wants to come can find out more.
                    </p>
                    <p>
                        Events can include any gathering that may interest the community. This might be
                        concerts, workshops, conferences, courses, etc.
                    </p>
                </div>
            </div>
        )
    }
})
