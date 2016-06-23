var React = require('react');

module.exports = React.createClass({
    render: function() {
        return (
            <div id = 'notice-header' className = 'head row'>
                <div className = 'col-md-8 col-md-offset-2 holder'>
                    <h1>Arab Music Notices</h1>
                    <p>
                        Notices are pieces of news that are relevant to the Arab music scholarly community.
                        These may be calls for papers or presentations, funding opportunities, or other
                        announcements that you would like to share.
                    </p>
                    <p>
                        Log in to post a notice. Be sure to tag it for easy sorting and filtering.
                    </p>
                </div>
            </div>
        )
    }
})
