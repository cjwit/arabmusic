var React = require('react');
var actions = require('../actions/ResourceActions');
var tags = require('../tags.js');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            title: "",
            description: "",
            tags: [],
            items: []
        };
    },

    componentDidMount: function () {
        var toggleTag = this.toggleTag;
        $('#tags :input').change(function() {
            toggleTag(this.name);
        })
    },

    addCollection: function(e) {
        e.preventDefault();
        var info = this.state;
        info.edited = false;
        var now = new Date(Date.now());
        info.editDate = now;
        info.date = now;
        actions.addCollection(info);
        window.location.href = '/resources/'
    },

    handleInputChange: function(e) {
        e.preventDefault();
        var name = e.target.name;
        var value = e.target.value;
        var state = this.state;
        state[name] = value;
        this.setState(state);
    },

    toggleTag: function(name) {
        var tags = this.state.tags;
        var index = tags.indexOf(name)
        if (index === -1) {
            tags.push(name);
        } else {
            tags.splice(index, 1);
        }
        this.setState({
            tags: tags
        })
    },

    render: function() {
        var tagButtons = [];
        var allTags = tags.geographic.concat(tags.musical).concat(tags.conceptual);
        allTags.map(function(tag, index) {
            tagButtons.push(
                <label className = 'tag btn btn-default btn-xs' onChange = { this.toggleTag } key = { 'check' + tag }>
                    <input type = 'checkbox' name = { tag } autocomplete='off' /> { tag }
                </label>)
        });

        return (
            <div className = 'container'>

                <div className = 'row'>
                    <div className = 'col-md-8 col-md-offset-2'>
                        <form onSubmit = { this.addCollection } id = "addCollectionForm">
                            <div className="form-group">
                                <label className = 'control-label' HTMLfor="title">Collection Title</label>
                                <input type="text" className="form-control"
                                       id="title"
                                       name = 'title'
                                       placeholder="Title"
                                       value = { this.state.title }
                                       onChange = { this.handleInputChange } />
                            </div>
                            <div className="form-group">
                                <textarea className="form-control" rows = "3"
                                          id="description"
                                          name = 'description'
                                          placeholder="You can change the size of this box by dragging the lower-right corner."
                                          value = { this.state.description }
                                          onChange = { this.handleInputChange } />
                                <p className="help-block">What types of items should this collection contain?</p>

                            </div>
                            <div className="form-group">
                                <label className = 'control-label'>Select Tags</label>
                                <div id = 'tags' class = 'btn-group' data-toggle='buttons'>
                                    { tagButtons }
                                </div>
                            </div>

                            <button type="submit" className="btn btn-default">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
});
