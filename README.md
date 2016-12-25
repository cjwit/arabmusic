# Arabic Music Research homepage

### Built on React.js using Node.js, Express.js, and MongoDB

Development page is live at [https://whispering-sands-88923.herokuapp.com](https://whispering-sands-88923.herokuapp.com).

Next Up
* Email webmaster with postings
* Events
	* Add location as a entry below Location
	* Can u add a field for a URL in the “events” section
* FAQ Section
	* Terms of Use
    * Civility and IP disclaimer
    * We only keep publicly available Facebook/Google info...
    * Help with report bug link
	* Login… Submission process… Moderation… Copyright issues (permissions, material submission…)… "Code of conduct"
* Check functionality of buttons (especially "this" references)
	* Edit post, comment (delete works) [Discussion.jsx 199, 68]
	* Edit event
	* Edit notice
	* Render FAQ log, login store logs

* Set up development environment

Eventually:
* Directory
	* Add link back in after some changes regarding privacy
	* Allow user to change name, hide info
	* About page tooltip: The directory only lists information that you allow when you log in using Facebook or Google. You can edit that information from the User tab, after you log in.
* Only admins can delete resource collections that are not empty (set as an array in a process.env variable?)
* Make images responsive
* Ready for production
	* Set up real address, CNAME
	* Remove console.logs from stores
	* Remove console.logs from navbar logins
	* Change React version to production, see [minified](https://fb.me/react-minification)
* Blog on Medium
