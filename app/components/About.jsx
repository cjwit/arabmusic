var React = require('react');

module.exports = React.createClass({
    render: function() {
        return (
            <div className = 'holder' >
                <h1>About the Society</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                <div className = 'row'>
                    <div className = 'col-md-6 col-md-offset-6'>
                        <p>You can also sign up for the Society for Arab Music email list: </p>
                        <a href='http://www.mailman.srv.ualberta.ca/mailman/listinfo/samr-list' target='_blank'>
                            <span className = 'btn btn-default float-right'>SAMR-list</span>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
})
