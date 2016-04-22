var dispatcher = require('../dispatcher');

module.exports = {
    // called from the EventForm
    changePage: function(target) {
        dispatcher.dispatch({
            object: target,
            type: "page:changePage"
        });
    }
}
