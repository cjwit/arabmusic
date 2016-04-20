var React = require('react');
var ReactDOM = require('react-dom');
var Home = require('./components/Home.jsx');

var events = [
    {
        name: "Arabic Music Concert",
        place: "Chicago, IL",
        description: "A great show of great music for great people and whatnot. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: new Date(Date.now()),
        contact: "joeshmoe@gmail.com"
    },
    {
        name: "Arabic Music Concert",
        place: "Chicago, IL",
        description: "A great show of great music for great people and whatnot. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: new Date(Date.now()),
        contact: "joeshmoe@gmail.com"
    },
    {
        name: "Arabic Music Concert",
        place: "Chicago, IL",
        description: "A great show of great music for great people and whatnot. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: new Date(Date.now()),
        contact: "joeshmoe@gmail.com"
    },
    {
        name: "Arabic Music Concert",
        place: "Chicago, IL",
        description: "A great show of great music for great people and whatnot. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: new Date(Date.now()),
        contact: "joeshmoe@gmail.com"
    },
    {
        name: "Arabic Music Concert",
        place: "Chicago, IL",
        description: "A great show of great music for great people and whatnot. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: new Date(Date.now()),
        contact: "joeshmoe@gmail.com"
    },
    {
        name: "Arabic Music Concert",
        place: "Chicago, IL",
        description: "A great show of great music for great people and whatnot. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: new Date(Date.now()),
        contact: "joeshmoe@gmail.com"
    },
    {
        name: "Arabic Music Concert",
        place: "Chicago, IL",
        description: "A great show of great music for great people and whatnot. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: new Date(Date.now()),
        contact: "joeshmoe@gmail.com"
    },
    {
        name: "Arabic Music Concert",
        place: "Chicago, IL",
        description: "A great show of great music for great people and whatnot. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: new Date(Date.now()),
        contact: "joeshmoe@gmail.com"
    },
    {
        name: "Arabic Music Concert",
        place: "Chicago, IL",
        description: "A great show of great music for great people and whatnot. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        date: new Date(Date.now()),
        contact: "joeshmoe@gmail.com"
    }
]

function render() {
    ReactDOM.render(<Home events = { events.splice(0, 5) } />, document.getElementById('container'));
}
render();

// Navbar navigations: add links or prevent defaults later
$('.navbar-brand').click(function(e) {
    $('.navlink').removeClass('active');
})

$('.navlink').click(function(e) {
    $('.navlink').removeClass('active');
    $(this).addClass('active');
});
