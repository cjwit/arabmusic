// Names and emails
var firstNames = ["John", "Stacy", "Bill", "Samra", "Fiona", "Carl", "Taylor", "Stephen", "Muhammed", "Fatima", "Amina"]
var lastNames = ["Smith", "Jones", "Arrazak", "Assalam", "Miller", "Meuller", "Michaelson", "Saladin", "Farrouk"]
var domains = ["gmail.com", "hotmail.com", "aol.com", "yahoo.com", "fakeschool.edu", "sillyplace.edu"]

var fillerText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
var eventNames = ["Arabic Music Concert", "Turkish Music Concert", "Symposium on Something Nifty", "Workshop", "Performance by a great group of great people who do great things", "Research group", "Really Important Meeting of people who do stuff", "Crazy Big Conference"];
var locations = ["London", "NYC", "Seattle", "Santa Barbara", "Cairo, Egypt", "Someplacewithareallylongnamethatshouldbedealtwith", "Tallahassee", "Scandanavia", "Los Angeles", "Chicago"]
var descriptions = ["Meet important people. ", "Research activities are grand. ", "You'll wish you had stayed at home. "]

var discussionTitles = ["I love this music!", "Where can I learn to improvise?", "I need an oud...", "This is the greatest website I've ever seen!", "People can be mean to us newbies", "How can I learn more about Arabic music?", "What colleges are best?"];

var dateMaker = function() {
    var fromToday = Math.floor(Math.random() * 365 * 2) - 365;
    return new Date(Date.now() + (fromToday * 86400000))
}

var pastDateMaker = function() {
    var fromToday = Math.floor(Math.random() * 365);
    return new Date(Date.now() - (fromToday * 86400000))
}

var randomName = function() {
    var first = firstNames[Math.floor(Math.random() * firstNames.length)]
    var last = lastNames[Math.floor(Math.random() * lastNames.length)]
    return first + ' ' + last;
}

var randomEmail = function() {
    var first = firstNames[Math.floor(Math.random() * firstNames.length)].toLowerCase();
    var domain = domains[Math.floor(Math.random() * domains.length)]
    return first + '@' + domain;
}

// build events list
var events = [];
// EVENTS WILL ALSO NEED OWNERS
for (var i = 0; i < 10; i++) {
    var event =
        {
            name: eventNames[Math.floor(Math.random() * eventNames.length)],
            place: locations[Math.floor(Math.random() * locations.length)],
            description: descriptions[Math.floor(Math.random() * descriptions.length)] + fillerText,
            date: dateMaker()
        }
    events.push(event);
}

// build discussions list
var discussions = [];
for (i = 0; i < Math.floor(Math.random() * 8) + 5; i++) {
    var discussion = {
        title: discussionTitles[Math.floor(Math.random() * discussionTitles.length)],
        author: randomName(),
        date: pastDateMaker(),
        content: fillerText,
        comments: []
    }

    for (j = 0; j < Math.floor(Math.random() * 4); j++) {
        var comment = {
            author: randomName(),
            date: pastDateMaker(),
            content: fillerText
        }
        discussion.comments.push(comment);
    }
    discussions.push(discussion);
}

var content = {};
content.events = events;
content.discussions = discussions;
content.login = true;

module.exports = content;
