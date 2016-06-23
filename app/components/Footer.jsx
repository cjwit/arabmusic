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
                        <span className = 'arabic'>مؤسسة أرابيسك للثقافة العربية</span>
                    </p>
                    <p>
                        <a href='https://www.facebook.com/pages/Arabesque-Foundation-for-Arab-Culture/253287698040569' target = '_blank'><span className="glyphicon zocial-facebook"></span></a>
                        <a href='#' target = '_blank'><span className="glyphicon zocial-twitter"></span></a>
                        <a href='https://www.youtube.com/user/soberlyintricate' target = '_blank'><span className="glyphicon zocial-youtube"></span></a>
                    </p>
                    <p>
                        <span id = 'webmaster'>Email <a href = 'mailto:chris.witulski@gmail.com'>chris.witulski@gmail.com</a> with any questions or concerns regarding this page.</span><br/>
                        <span id = 'webmaster'>Website by <a href = 'http://cjwit.github.io' target = '_blank'>Christopher Witulski</a></span>
                    </p>
                </div>
            </div>
            )
    }
})
