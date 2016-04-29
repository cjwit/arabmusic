var React = require('react');

module.exports = React.createClass({
    render: function() {
        return (
            <div id = 'about-header' className = 'head row'>
                <div className = 'col-md-8 col-md-offset-2 holder'>
                    <h1>Arab Music Research</h1>
                    <p>
                        Welcome to the online home of the Arab music community. This page is intended to
                        be a space where lovers of the Arab world's wealth of music can come together
                        to share news, conversation, and resources.
                    </p>
                    <p>
                        Thanks to the support of the Arabesque Foundation for Arab Culture, this site can
                        serve listeners, performers, scholars, and any others who desire to explore
                        these sounds.
                    </p>
                </div>
            </div>
        )
    }
})
