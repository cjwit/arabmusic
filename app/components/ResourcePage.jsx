var React = require('react');
var ResourceList = require('./ResourceList.jsx');
var AddItem = require('./AddItem.jsx');
var ResourceCollection = require('./ResourceCollection.jsx');
var Navbar = require('./Navbar.jsx');
var Footer = require('./Footer.jsx');

module.exports = React.createClass({
    render: function() {
        var info = this.props.info;
        var login = this.props.login;
        return (
            <div>
                <Navbar active = 'resources' login = { login } />
                <div id = 'head' className = 'row'>
                    <div className = 'col-md-8 col-md-offset-2 holder'>
                        <h1>Arab Music Resources</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                </div>
                <div className = 'container'>
                    <div className = 'row holder'>
                        <div className = 'col-md-8'>
                            <h1>Resource Collection</h1>
                            <ResourceCollection info = { info } login = { login } />
                        </div>
                        <div className = 'col-md-4'>
                            <h1 className = 'spacer'>&nbsp;</h1>
                            <div id = "addItemContainer">
                                <AddItem info = { info } login = { login } />
                            </div>

                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
});
