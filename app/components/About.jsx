var React = require('react');

module.exports = React.createClass({
    render: function() {
        return (
            <div>
                <div id = 'about-header' className = 'head'>
					<div className = 'row'>
						<div className = 'col-md-8 col-md-offset-2 holder'>
							<h1>Arab Music Research</h1>
							<p>
								Welcome to the online home of the Arab music community. This page serves
								lovers of the Arab world's wealth of music as a place where they can come together
								to share news, conversation, and resources.
							</p>
							<p>
								Thanks to the support of the Arabesque Foundation for Arab Culture, this site can
								serve listeners, performers, scholars, and any others who desire to explore
								these sounds.
							</p>
						</div>
					</div>
                </div>
				<div className = 'container'>
					<div className = 'row'>
						<div className = 'col-md-12 holder'>
							<div className = 'row'>
								<div className = 'col-md-3'>
									<p className = "about-info">
										The organization of this page allows for quick access to different types of materials.
										The <span id = "resources-info" className = "more-info"> RESOURCE COLLECTIONS <span className="glyphicon glyphicon-circle-arrow-down" aria-hidden="true"></span> </span>
										and <span id = "notices-info" className = "more-info"> NOTICES <span className="glyphicon glyphicon-circle-arrow-down" aria-hidden="true"></span> </span>
										tabs contain lists of community-generated collections and news.
									</p>
								</div>
								<div className = 'col-md-3'>
									<p className = "about-info">
										The <span id = "talk-info" className = "more-info"> TALK <span className="glyphicon glyphicon-circle-arrow-down" aria-hidden="true"></span> </span>
									 	page provides a space for questions and answers on topics related to Arab music.
									</p>
								</div>
								<div className = 'col-md-3'>
									<p className = "about-info">
										The <span id = "events-info" className = "more-info"> EVENTS <span className="glyphicon glyphicon-circle-arrow-down" aria-hidden="true"></span> </span>
										and <span id = "directory-info" className = "more-info"> DIRECTORY <span className="glyphicon glyphicon-circle-arrow-down" aria-hidden="true"></span> </span>
										pages list news and information about the Arab music community's members and activities.
									</p>
								</div>
								<div className = 'col-md-3'>
									<p className = "about-info">
										Finally, the <span id = "notices-info" className = "more-info"> USER </span> page, which you can find by clicking on your photo
										after you log in, allows you to see your own posts, edit your directiory information, and make your listing private.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
                <div className = 'container'>
                    <div className = 'row'>
                        <div className = 'col-md-10 col-md-offset-1 holder'>
                            <h2>About Arabesque</h2>
                            <img id = 'logo' src = '/images/arabesque-dark.gif' />
                            <p>
                                The Arabesque Foundation for Arab Culture is dedicated to preserving the heritage of
                                classical Oriental music from the Arabic, Turkish, Armenian, and Sephardic traditions.
                                This web site grows out of that mission.
                            </p>
                            <p>
                                The Foundation team is comprised of individuals
                                from a great variety of professions, ranging from academicians to musicians,
                                all sharing the same passion for Oriental culture and music. Take the opportunity
                                to join that community by posting to the forums, sharing news of your local events
                                and other notices, and contributing to the collections of resources. If you have
                                any questions or suggestions about this page, please find contact info below.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
})
