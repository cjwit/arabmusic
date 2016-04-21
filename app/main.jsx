var React = require('react');
var ReactDOM = require('react-dom');
var Home = require('./components/Home.jsx');
var Dummy = require('./dummycontent.jsx');

var events = Dummy.events;
var discussions = Dummy.discussions;

function render() {
    ReactDOM.render(<Home
        events = {
                events.filter(function(event) {
                    return event.date > new Date(Date.now());
                }).sort(function(a, b) {
                    return b.date - a.date;
            }).splice(0, 5)
        }
        discussions = {
            discussions.sort(function(a, b) {
                return b.date - a.date;
            }).splice(0,3)
        }
    />, document.getElementById('container'));
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
