var React = require('react');
var Navbar = require('./Navbar.jsx');
var Footer = require('./Footer.jsx');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            login: this.props.login
        }
    },

	componentDidMount: function() {
		$('.faq-question').click(function() {
			$(this).next().slideToggle();
		})
	},

    render: function() {
        var login = this.props.login;

        return (
            <div>
                <Navbar active = 'faq' login = { login }/>
                <div>
					<div id = 'about-header' className = 'head row'>
						<div className = 'col-md-8 col-md-offset-2 holder'>
							<h1>Frequently Asked Questions</h1>
						</div>
					</div>
					<div className = 'container'>
						<div className = 'row'>
							<div className = 'col-md-10 col-md-offset-1 holder'>
								<h2>Section</h2>
								<div id = 'question1'>
									<p className = 'faq-question'>Question</p>
									<p className = 'faq-answer'>
										The Arabesque Foundation for Arab Culture is dedicated to preserving the heritage of
										classical Oriental music from the Arabic, Turkish, Armenian, and Sephardic traditions.
										This web site grows out of that mission.
									</p>
								</div>
								<div id = 'question2'>
									<p className = 'faq-question'>Question</p>
									<p className = 'faq-answer'>
										The Arabesque Foundation for Arab Culture is dedicated to preserving the heritage of
										classical Oriental music from the Arabic, Turkish, Armenian, and Sephardic traditions.
										This web site grows out of that mission.
									</p>
								</div>
								<div id = 'question3'>
									<p className = 'faq-question'>Question</p>
									<p className = 'faq-answer'>
										The Arabesque Foundation for Arab Culture is dedicated to preserving the heritage of
										classical Oriental music from the Arabic, Turkish, Armenian, and Sephardic traditions.
										This web site grows out of that mission.
									</p>
								</div>
								<div id = 'question4'>
									<p className = 'faq-question'>Question</p>
									<p className = 'faq-answer'>
										The Arabesque Foundation for Arab Culture is dedicated to preserving the heritage of
										classical Oriental music from the Arabic, Turkish, Armenian, and Sephardic traditions.
										This web site grows out of that mission.
									</p>
								</div>
								<h2>Section</h2>
								<div id = 'question5'>
									<p className = 'faq-question'>Question</p>
									<p className = 'faq-answer'>
										The Arabesque Foundation for Arab Culture is dedicated to preserving the heritage of
										classical Oriental music from the Arabic, Turkish, Armenian, and Sephardic traditions.
										This web site grows out of that mission.
									</p>
								</div>
								<div id = 'question6'>
									<p className = 'faq-question'>Question</p>
									<p className = 'faq-answer'>
										The Arabesque Foundation for Arab Culture is dedicated to preserving the heritage of
										classical Oriental music from the Arabic, Turkish, Armenian, and Sephardic traditions.
										This web site grows out of that mission.
									</p>
								</div>
								<div id = 'question7'>
									<p className = 'faq-question'>Question</p>
									<p className = 'faq-answer'>
										The Arabesque Foundation for Arab Culture is dedicated to preserving the heritage of
										classical Oriental music from the Arabic, Turkish, Armenian, and Sephardic traditions.
										This web site grows out of that mission.
									</p>
								</div>
								<div id = 'question8'>
									<p className = 'faq-question'>Question</p>
									<p className = 'faq-answer'>
										The Arabesque Foundation for Arab Culture is dedicated to preserving the heritage of
										classical Oriental music from the Arabic, Turkish, Armenian, and Sephardic traditions.
										This web site grows out of that mission.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
                <Footer />
            </div>
        )
    }
});
