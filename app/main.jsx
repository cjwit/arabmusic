var React = require('react');
var ReactDOM = require('react-dom');

// components
var Home = require('./components/Home.jsx');
var DiscussionsMain = require('./components/DiscussionsMain.jsx');
var DiscussionPage = require('./components/DiscussionPage.jsx');
var Events = require('./components/Events.jsx');
var EventPage = require('./components/EventPage.jsx');
var ResourcesMain = require('./components/ResourcesMain.jsx');
var ResourcePage = require('./components/ResourcePage.jsx');
var NoticePage = require('./components/NoticePage.jsx');
var User = require('./components/User.jsx');

// stores
var eventsStore = require('./stores/eventsStore');
var postsStore = require('./stores/postsStore');
var resourceStore = require('./stores/resourceStore');
var noticeStore = require('./stores/noticeStore');
var loginStore = require('./stores/loginStore');

// Get content from database
var events = [];
var getEventsCallback = function(_events) {
    events = _events;
    render();
}
eventsStore.onChange(getEventsCallback);

var discussions = [];
var getPostsCallback = function(_discussions) {
    discussions = _discussions;
    render();
}
postsStore.onChange(getPostsCallback);

var resources = [];
var getResourcesCallback = function(_resources) {
    resources = _resources;
    render();
}
resourceStore.onChange(getResourcesCallback);

var notices = [];
var getNoticesCallback = function(_notices) {
    notices = _notices;
    render();
}
noticeStore.onChange(getNoticesCallback);

var users = [];
var getUsersCallback = function(_users) {
    users = _users;
    render();
}
loginStore.onChange(getUsersCallback);
console.log('main', users)

// should return a user name or null, may rename "username"
// could find a better place to load the FBSDK, perhaps in the loginStore itself
// then the loginStore FB functions should work
var login = loginStore.getUser();
console.log(login);

// functions to manipulate data
function dateEvents() {
    events.map(function(event) {
        event.date = new Date(event.date);
    })
}

function dateDiscussions() {
    discussions.map(function(post) {
        post.date = new Date(post.date);
    })
}

function dateNotices() {
    notices.map(function(notice) {
        notice.eventDate = new Date(notice.eventDate);
    })
}

function findItem(list, id) {
    var item;
    list.map(function(i) {
        if (i._id === id) {
            item = i;
        }
    })
    if (item.hasOwnProperty('date')) {
        item.date = new Date(item.date);
    }
    return item
}

function render() {
    var path = window.location.pathname;
    var split = path.split('/')
    var folder = split[1]
    var id = split[2] || null

    if (id === null) {
        switch (folder) {
            case '':
                renderHome();
                break;
            case 'discussions':
                renderDiscussions();
                break;
            case 'events':
                renderEvents();
                break;
            case 'resources':
                renderResources();
                break;
            case 'user':
                renderUser();
                break;
        }
    } else {
        switch (folder) {
            case 'discussions':
                renderDiscussionPage(id);
                break;
            case 'events':
                renderEventPage(id);
                break;
            case 'resources':
                renderResourcePage(id);
                break
            case 'notices':
                renderNoticePage(id);
                break
        }
    }
}

function renderHome() {
    dateEvents();
    dateDiscussions();
    ReactDOM.render(<Home
        events = { events }
        discussions = { discussions }
        login = { login }
        />, document.getElementById('container'));
}

function renderDiscussions() {
    dateDiscussions();
    ReactDOM.render(<DiscussionsMain
        discussions = { discussions }
        login = { login }
        />, document.getElementById('container'));
}

function renderDiscussionPage(id) {
    var post = findItem(discussions, id);
    ReactDOM.render(<DiscussionPage
        info = { post }
        login = { login }
        />, document.getElementById('container'));
}

function renderEvents() {
    dateEvents();
    ReactDOM.render(<Events
        events = { events }
        login = { login }
        />, document.getElementById('container'));
}

function renderEventPage(id) {
    var event = findItem(events, id);
    ReactDOM.render(<EventPage
        info = { event }
        login = { login }
        />, document.getElementById('container'));
}

function renderResources() {
    ReactDOM.render(<ResourcesMain
        resources = { resources }
        notices = { notices }
        login = { login }
        />, document.getElementById('container'));
}

function renderUser() {
    // filter discussions, events, resources, and notices for member's contributions
    ReactDOM.render(<User
        login = { login }
        />, document.getElementById('container'));
}

function renderResourcePage(id) {
    var collection = findItem(resources, id);
    ReactDOM.render(<ResourcePage
        info = { collection }
        login = { login }
        />, document.getElementById('container'));
}

function renderNoticePage(id) {
    var notice = findItem(notices, id);
    ReactDOM.render(<NoticePage
        info = { notice }
        login = { login }
        />, document.getElementById('container'));
}

// initial rendering
render();
