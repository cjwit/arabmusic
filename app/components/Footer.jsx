var React = require('react');

module.exports = React.createClass({
    render: function() {
        return (
            <div id="footer">
                <div className = 'row'>
                    <div className = 'text-center'>
                        <p>
                            <a href='https://arabesquefoundation.net/' target = '_blank'>Arabesque Foundation for Arab Culture</a><br />
                            <span className = 'arabic'>مؤسسة أرابيسك للثقافة العربية</span><br />
                            <a href='#' target = '_blank'>Facebook</a> | <a href='#' target = '_blank'>Twitter</a><br />
                            <a href='#' target = '_blank'>YouTube</a> | <a href='#' target = '_blank'>SoundCloud</a>
                        </p>
                        <p>
                            <span id = 'webmaster'>Website by <a href = 'http://cjwit.github.io' target = '_blank'>Christopher Witulski</a></span>
                        </p>
                    </div>
                </div>
            </div>
            )
    }
})
