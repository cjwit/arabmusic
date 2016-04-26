var React = require('react');
var ResourceList = require('./ResourceList.jsx');
var AddCollection = require('./AddCollection.jsx');
var Navbar = require('./Navbar.jsx');
var Footer = require('./Footer.jsx');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            showForm: false
        };
    },

    toggleForm: function() {
        this.setState({ showForm: !this.state.showForm })
        return;
    },

    render: function() {
        // sort alphabetically and split in half between two lists
        var resources = this.props.resources;

        var login = this.props.login;

        return (
            <div>
                <Navbar active = 'resources' login = { login }/>
                <div id = 'head' className = 'row'>
                    <div className = 'col-md-8 col-md-offset-2 holder'>
                        <h1>Arab Music Resources</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                        { login ?
                            <button id = 'addCollectionFormToggle'
                                className = 'btn btn-default'
                                onClick = { this.toggleForm } >Add a New Collection
                            </button> :
                            <p className = 'pull-right'>
                                Login to add a collection
                            </p>
                        }

                    </div>
                </div>

                { this.state.showForm ? <AddCollection /> : null }

                <div className = 'container'>
                    <div className = 'row'>
                        <div className = 'col-md-6'>
                            <div className = 'holder'>
                                <h1>Resource Collections</h1>
                                <ResourceList resources = { resources } />
                            </div>
                        </div>
                        <div className = 'col-md-6'>
                            <div className = 'holder'>
                                <h1>More</h1>
                                Add another resource list here, after they are sorted.
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
});
