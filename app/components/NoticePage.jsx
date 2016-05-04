var React = require('react');
var ResourceHeader = require('./ResourceHeader.jsx');
var Notice = require('./Notice.jsx');
var Navbar = require('./Navbar.jsx');
var Footer = require('./Footer.jsx');

module.exports = React.createClass({
    render: function() {
        var info = this.props.info;
        var login = this.props.login;
        return (
            <div>
                <Navbar active = 'resources' login = { login } />
                <ResourceHeader />
                <div className = 'container'>
                    <div className = 'row holder'>
                        <div className = 'col-md-8 col-md-offset-2'>
                            <h1>Notice</h1>
                            <Notice info = { info } login = { login } />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
});
