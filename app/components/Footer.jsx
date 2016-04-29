var React = require('react');

module.exports = React.createClass({
    render: function() {
        return (
            <div id="footer">
                <div id = 'footer-image'>
                    <a href='https://arabesquefoundation.net/' target = '_blank'>
                        <img className = 'img-responsive' alt = 'Arabesque Foundation' src='/images/arabesque-white.png' />
                    </a>
                </div>
                <div id = 'footer-text'>
                    <p>
                        <span className = 'arabic'>مؤسسة أرابيسك للثقافة العربية</span><br />
                        <a href='https://www.facebook.com/pages/Arabesque-Foundation-for-Arab-Culture/253287698040569' target = '_blank'>Facebook</a> | <a href='#' target = '_blank'>Twitter</a><br />
                        <a href='https://www.youtube.com/user/soberlyintricate' target = '_blank'>YouTube</a> | <a href='https://arabesquemusicensemble.com/' target = '_blank'>Arabesque Music Ensemble</a>
                    </p>
                    <p>
                        <span id = 'webmaster'>Website by <a href = 'http://cjwit.github.io' target = '_blank'>Christopher Witulski</a></span>
                    </p>
                </div>
            </div>
            )
    }
})
