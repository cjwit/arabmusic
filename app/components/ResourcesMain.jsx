var React = require('react');
var ResourceList = require('./ResourceList.jsx');
var ResourceHeader = require('./ResourceHeader.jsx');
var AddCollection = require('./AddCollection.jsx');
var Navbar = require('./Navbar.jsx');
var Footer = require('./Footer.jsx');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            showForm: false
        };
    },

    componentWillReceiveProps: function() {
        this.setState({ showForm: false })
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
                <ResourceHeader />

                { this.state.showForm ? <AddCollection /> : null }

                <div className = 'container'>
                    <div className = 'row'>
                        <div className = 'col-md-6'>
                            <div className = 'holder'>
                                <h1>
                                    { login ?
                                        <button id = 'addCollectionFormToggle'
                                            className = 'btn btn-default pull-right'
                                            onClick = { this.toggleForm } >Create a Collection
                                        </button>
                                        :
                                        <button id = 'addCollectionFormToggle'
                                            className = 'btn btn-default pull-right'>
                                            Login to Create a Collection
                                        </button>
                                    }

                                    Resource Collections
                                </h1>
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
