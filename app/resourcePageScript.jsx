var React = require('react');
var ReactDOM = require('react-dom');
var ResourcePage = require('./components/ResourcePage.jsx');
var resourceStore = require('./stores/resourceStore');
var Dummy = require('./dummycontent.js');

// Get content from database
var resources = [];
var getResourcesCallback = function(_resources) {
    resources = _resources;
    render();
}
resourceStore.onChange(getResourcesCallback);

var login = Dummy.login;

function render() {
    // give events Date objects
    var id = window.location.pathname.replace("/resources/", "");
    var thisCollection;
    resources.map(function(collection) {
        if (collection._id === id) {
            thisCollection = collection;
        }
    })

    ReactDOM.render(<ResourcePage
        info = { thisCollection }
        login = { login }
        />, document.getElementById('container'));
}

// initial rendering
render();
