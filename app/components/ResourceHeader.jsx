var React = require('react');

module.exports = React.createClass({
    render: function() {
        return (
            <div id = 'resource-header' className = 'head row'>
                <div className = 'col-md-8 col-md-offset-2 holder'>
                    <h1>Arab Music Resources</h1>
                    <p>
                        One goal for this site is to provide resources for performers, scholars, and
                        fans of Arab music. To that end, you can create collaborative collections of
                        books, recordings, websites, or anything else that you find to be useful.
                    </p>
                    <p>
                        Log in to add a collection. Be sure to tag it and provide clear details as to what
                        you hope it will contain. Visit other collections and add your favorite resources.
                    </p>
                </div>
            </div>
        )
    }
})
