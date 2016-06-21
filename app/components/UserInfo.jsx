var React = require('react');
var actions = require('../actions/UserActions');
var loginActions = require('../actions/loginActions');
var tags = require('../tags.js');

module.exports = React.createClass({
    getInitialState: function() {
        return ({
            editing: false,
            info: {
                name: this.props.login.user.name,
                email: this.props.login.user.email,
                photo: this.props.login.user.photo,
                provider: this.props.login.user.provider,
                description: this.props.login.user.description,
                joined: new Date(this.props.login.user.joined),
                tags: this.props.login.user.tags,
                edited: this.props.login.user.edited,
                editDate: new Date(this.props.login.user.editDate)
            }
        })
    },

    editUser: function(e) {
        e.preventDefault();
        var info = this.state.info;
        info.id = this.props.login.user._id;
        info.edited = true;
        info.editDate = new Date(Date.now());

        actions.editUser(info);
        this.setState({ editing: false });
    },

    deleteUser: function(e) {
        e.preventDefault();
        var provider = this.props.login.user.provider;
        if (provider === 'google') {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut(loginActions.logout())
                .then(function () {
                    console.log('User signed out (Google).');
                });
        } else if (provider === 'facebook') {
            FB.logout(loginActions.logout());
            console.log('User signed out (Facebook).')
        }
        actions.deleteUser(this.props.login.user._id)
        window.location.href = '/';
    },

    openForm: function() {
        this.setState({ editing: true })
        // wait for rendering to complete
        var toggleTag = this.toggleTag;
        window.requestAnimationFrame(function() {
            $('#tags :input').change(function() {
                toggleTag(this.name);
            })
        })
    },

    closeForm: function(e) {
        e.preventDefault();
        this.setState({ editing: false });
    },

    toggleTag: function(name) {
        var info = this.state.info;
        var index = info.tags.indexOf(name)
        if (index === -1) {
            info.tags.push(name);
        } else {
            info.tags.splice(index, 1);
        }
        this.setState({
            info: info
        });
    },

    handleInputChange: function(e) {
        e.preventDefault();
        var name = e.target.name;
        var value = e.target.value;
        var info = this.state.info;
        info[name] = value;
        this.setState({
            info: info
        });
    },

    render: function() {
        // component does not load until login is set up
        var login = this.props.login;
        var userID = login.user._id,
            props = login.user,
            id = props._id;

        var tagString = '';
        props.tags.map(function(tag, index) {
            if (index === props.tags.length - 1) {
                tagString += tag;
            } else {
                tagString += tag + ', ';
            }
        });
        if (!this.state.editing) {
            return (
                <div className = 'user' id = { id }>
                    <div className = 'btn-group pull-right' role = 'group' aria-label='...'>
                        <a onClick = { this.openForm } className = 'btn btn-default'>
                            <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                        </a>
                    </div>
                    <div className = 'user-name'>
                        { this.state.info.name }
                    </div>
                    <div className = 'user-email'>
                        { this.state.info.email }
                    </div>
                    { props.photo === "" ? null : <img className = 'img-responsive user-pic' src = { props.photo } /> }
                    <div className = 'user-description'>
                        { this.state.info.description }
                        { this.state.info.edited ?
                            <p>(Edited on { new Date(props.editDate).toLocaleDateString() })</p>
                            : null
                        }
                    </div>
                    { this.state.info.tags.length > 0 ?
                        <div className = 'user-tags'>
                            <span className = 'glyphicon glyphicon-tag' aria-hidden = 'true'></span>&nbsp;
                            { tagString }
                        </div>
                        : null
                    }
                    <div className = 'user-description'>
                        <strong>
                            <p>
                                Click the pencil icon to add or edit your displayed name, interests, and other information.
                            </p>
                        </strong>
                    </div>
                </div>
            )
        } else {
            var tagButtons = [];
            var allTags = tags.geographic.concat(tags.musical).concat(tags.conceptual);
            allTags.map(function(tag, index) {
                var preChecked = (props.tags.indexOf(tag) !== -1)
                tagButtons.push(
                    <label className = { preChecked ? 'tag btn btn-default btn-xs active' : 'tag btn btn-default btn-xs' }
                           onChange = { this.toggleTag }
                           key = { 'check' + tag }>
                        <input type = 'checkbox'
                               name = { tag }
                               autocomplete='off'
                               defaultChecked = { preChecked } /> { tag }
                    </label>)
            });
            return (
                <div className = 'user' id = { id }>
                    <form onSubmit = { this.editUser } id = 'editUserForm'>
                        <div className="form-group">
                            <label className = 'control-label' HTMLfor="name">Edit Your Post</label>
                            <input type="text" className="form-control"
                                   id="name"
                                   name = 'name'
                                   placeholder="Name"
                                   defaultValue = { props.name }
                                   onChange = { this.handleInputChange } />
                        </div>
                        <div className="form-group">
                            <label className = 'control-label' HTMLfor="email">Email</label>
                            <input type="text" className="form-control"
                                   id="email"
                                   name = 'email'
                                   placeholder="Email"
                                   defaultValue = { props.email }
                                   onChange = { this.handleInputChange } />
                        </div>
                        <div className="form-group">
                            <label className = 'control-label' HTMLfor="name">Photo URL (from { props.provider })</label>
                            <input type="text" className="form-control"
                                   id="photo"
                                   name = 'photo'
                                   placeholder="Photo URL"
                                   defaultValue = { props.photo }
                                   onChange = { this.handleInputChange } />
                        </div>
                        <div className="form-group">
                            <label className = 'control-label' HTMLfor="description">Provide a short description of yourself</label>
                            <textarea className="form-control" rows = "3"
                                      id="description"
                                      name = "description"
                                      defaultValue = { props.description }
                                      onChange = { this.handleInputChange } />
                        </div>
                        <div className="form-group">
                            <div id = 'tags' class = 'btn-group' data-toggle='buttons'>
                                { tagButtons }
                            </div>
                        </div>

                        <button className="btn btn-default">Submit</button>&nbsp;
                        <button className="btn btn-warning" onClick = { this.closeForm }>Cancel</button>&nbsp;
                        <button className="btn btn-danger" onClick = { this.deleteUser }>Delete your account</button>
                    </form>
                    <div className="user-description">
                        <strong>
                            <p></p>
                            <p>
                                Note: Deleting your user information DOES NOT remove your posted content. You can edit or delete your posts using the buttons on the individual page for each one.
                            </p>
                        </strong>
                    </div>
                </div>
            )
        }
    }
})
