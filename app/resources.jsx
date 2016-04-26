var React = require('react');
var ReactDOM = require('react-dom');
var ResourcesMain = require('./components/ResourcesMain.jsx');
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
    // render, send target
    ReactDOM.render(<ResourcesMain
        resources = { resources }
        login = { login }
        />, document.getElementById('container'));
}

// initial rendering
render();
