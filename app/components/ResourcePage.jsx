var React = require('react');
var ResourceList = require('./ResourceList.jsx');
var ResourceHeader = require('./ResourceHeader.jsx');
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
                <ResourceHeader />
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
