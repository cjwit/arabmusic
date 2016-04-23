var dispatcher = require('../dispatcher.js');

var PageStore = function() {
    var listeners = [];             // collection of functions
    var target = {
        page: 'home',
        content: null
    };

    var getTarget = function() {
        return target;
    }

    var onChange = function(listener) {
        listeners.push(listener);
    }

    var changePage = function(_target) {
        target.page = _target.page;
        target.content = null;
        console.log('from pageStore.changePage, page: ', target.page, 'content: ', target.content)
        triggerListeners();
    }

    // recieving the correct object from PageActions
    var openDiscussion = function(object) {
        target.page = 'openDiscussion';
        target.content = object;
        console.log('from pageStore.openDiscussion, page: ', target.page, 'content: ', target.content)
        triggerListeners();
    }

    // SOMETHING HERE FIXED IT BEFORE...
    var triggerListeners = function() {
        listeners.forEach(function(listener) {
            listener(target);
        })
    }

    dispatcher.register(function (payload) {
        var split = payload.type.split(':');
        if (split[0] === 'page') {
            switch (split[1]) {
                case "changePage":
                    changePage(payload.object);
                    break;
                case "openDiscussion":
                    openDiscussion(payload.object);
                    break;
            }
        }
    });

    // create the object for export
    return {
        getTarget: getTarget,
        onChange: onChange
    }
}

module.exports = PageStore();
