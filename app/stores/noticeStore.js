var dispatcher = require('../dispatcher.js');
var noticeService = require('../services/noticeService.js');

var NoticeStore = function() {
    var listeners = [];

    var getNotices = function(cb) {
        noticeService.getNotices().then(function (res) {
            cb(res);
        });
    }

    var onChange = function(listener) {
        getNotices(listener);
        listeners.push(listener);
    }

    var addNotice = function(notice) {
        noticeService.addNotice(notice).then(function (res) {
            console.log(res);
            triggerListeners();
        });
    }

    var editNotice = function(notice) {
        noticeService.editNotice(notice).then(function (res) {
            console.log(res);
            triggerListeners();
        })
    }

    var deleteNotice = function(notice) {
        noticeService.deleteNotice(notice).then(function(res) {
            console.log(res);
            triggerListeners();
        });
    }

    var triggerListeners = function() {
        getNotices(function (res) {
            listeners.forEach(function(listener) {
                listener(res);
            });
        });
    }

    dispatcher.register(function (payload) {
        var split = payload.type.split(':');
        if (split[0] === 'notice') {
            switch (split[1]) {
                case "addNotice":
                    addNotice(payload.object);
                    break;
                case "editNotice":
                    editNotice(payload.object);
                    break;
                case "deleteNotice":
                    deleteNotice(payload.object);
                    break;
            }
        }
    });

    // create the object for export
    return {
        onChange: onChange
    }
}

module.exports = NoticeStore();
