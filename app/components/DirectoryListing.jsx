var React = require('react');

module.exports = React.createClass({
    render: function() {
        var props = this.props.user,
            tagString = '';

        props.tags.map(function(tag, index) {
            if (index === props.tags.length - 1) {
                tagString += tag;
            } else {
                tagString += tag + ', ';
            }
        });

        return (
            <div className = 'directory-listing' id = { props._id }>
                <span className = 'directory-name'>
                    { props.name }&nbsp;
                </span>
                <span className = 'directory-description'>
                    { props.description }
                </span>
                    { props.tags.length > 0 ?
                        <div className = 'directory-interests'>
                            <span className = 'directory-description'>Interests:&nbsp;</span>
                            <div className = 'directory-tags'>
                                <span className = 'glyphicon glyphicon-tag' aria-hidden = 'true'></span>&nbsp;
                                { tagString }
                            </div>
                        </div>
                        : null
                    }
            </div>
        )
    }
});
