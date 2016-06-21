var React = require('react');
var Navbar = require('./Navbar.jsx');
var DirectoryListing = require('./DirectoryListing.jsx');
var Footer = require('./Footer.jsx');

module.exports = React.createClass({
    render: function() {
        var users = this.props.users,
            login = this.props.login,
            userList = [],
            numUsers = users.length;

        if (numUsers < 1) {
            userList = "Loading...";
        } else {
            users.map(function(user, index) {
                userList.push(<DirectoryListing user = { user } key = { 'user' + index } />)
            });
        }

        return (
            <div>
                <Navbar active = 'directory' login = { login } />
                <div className = 'container'>
                    <div className = 'row holder'>
                        <div className = 'col-md-8 col-md-offset-2'>
                            <h1>Arab Music Research Users</h1>
                            { userList }
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )

    }
})
