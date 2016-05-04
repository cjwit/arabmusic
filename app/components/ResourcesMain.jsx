var React = require('react');
var ResourceList = require('./ResourceList.jsx');
var NoticeList = require('./NoticeList.jsx');
var ResourceHeader = require('./ResourceHeader.jsx');
var AddCollection = require('./AddCollection.jsx');
var AddNotice = require('./AddNotice.jsx');
var Navbar = require('./Navbar.jsx');
var Footer = require('./Footer.jsx');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            AddCollection: false,
            AddNotice: false
        };
    },

    componentWillReceiveProps: function() {
        this.setState({
            AddCollection: false,
            AddNotice: false
        })
    },

    toggleCollection: function() {
        this.setState({
            AddNotice: false,
            AddCollection: !this.state.AddCollection
        })
        return;
    },

    toggleNotice: function() {
        this.setState({
            AddCollection: false,
            AddNotice: !this.state.AddNotice
        })
        return;
    },

    render: function() {
        // sort alphabetically and split in half between two lists
        var resources = this.props.resources;
        var notices = this.props.notices;
        var login = this.props.login;

        return (
            <div>
                <Navbar active = 'resources' login = { login }/>
                <ResourceHeader />

                { this.state.AddCollection ? <AddCollection /> : null }
                { this.state.AddNotice ? <AddNotice /> : null }

                <div className = 'container'>
                    <div className = 'row'>
                        <div className = 'col-md-6'>
                            <div className = 'holder'>
                                <h1>
                                    { login ?
                                        <button id = 'addCollectionFormToggle'
                                            className = 'btn btn-default pull-right'
                                            onClick = { this.toggleCollection } >Create a Collection
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
                                <h1>
                                    { login ?
                                        <button id = 'addNoticeFormToggle'
                                            className = 'btn btn-default pull-right'
                                            onClick = { this.toggleNotice } >Post a Notice
                                        </button>
                                        :
                                        <button id = 'addNoticeFormToggle'
                                            className = 'btn btn-default pull-right'>
                                            Login to Post a Notice
                                        </button>
                                    }

                                    Notices
                                </h1>
                                <NoticeList notices = { notices } />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
});
