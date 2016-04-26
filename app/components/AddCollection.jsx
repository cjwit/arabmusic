var React = require('react');
var actions = require('../actions/ResourceActions');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            title: "",
            description: "",
            items: []
        };
    },

    addCollection: function(e) {
        e.preventDefault();
        actions.addCollection(this.state);
        this.setState({
            title: "",
            description: ""
        })
    },

    /*
    componentDidMount: function() {
        // get info on the form position
        var form = $('#addPostForm'),
            formContainer = $('#addPostContainer'),
            footer = $('#footer'),
            startPosition = form.offset().top,
            footerHeight = footer.offset().top,
            width = formContainer.width(),
            height = form.height();

        $(window).resize(function () {
            width = formContainer.width(),
            footerHeight = footer.offset().top;
        })

        // at bottom of the page, form goes back to the top!
        $(window).on('scroll', function() {
            var scrollPosition = $(window).scrollTop(),
                atTop = startPosition - 100 > scrollPosition,
                atBottom = scrollPosition + height + 150 > footerHeight;

            if (!atTop && !atBottom) {
                form.addClass('sticky')
                form.css({'width': width })
            } else {
                form.removeClass('sticky')
            }
        })
    },
    */

    handleInputChange: function(e) {
        e.preventDefault();
        var name = e.target.name;
        var value = e.target.value;
        var state = this.state;
        state[name] = value;
        this.setState(state);
    },

    render: function() {
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
                            <button type="submit" className="btn btn-default">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
});
