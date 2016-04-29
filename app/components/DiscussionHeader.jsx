var React = require('react');

module.exports = React.createClass({
    render: function() {
        return (
            <div id = 'discussion-header' className = 'head row'>
                <div className = 'col-md-8 col-md-offset-2 holder'>
                    <h1>Questions and Answers</h1>
                    <p>
                        Use this space to as questions, share opinions, and explore ideas
                        related to Arab music's sounds, communities, and histories.
                    </p>
                </div>
            </div>
        )
    }
})
