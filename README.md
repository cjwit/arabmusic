# Arabic Music Research homepage

### Built on React.js using Node.js, Express.js, and MongoDB

Development page is live at [https://whispering-sands-88923.herokuapp.com](https://whispering-sands-88923.herokuapp.com).

Next Up
* Split resources and notices pages
* User page: error message if login status is false
* Google login
    * Login controller should update database if user chooses a different login mode
    * Setting up navbar directly in index.html and rendering other pages underneath it may solve Google problems
* Validation issues
    * Submit button only validates after key entry
    * Return to form validation, optional items should not validate

Eventually:
* Only admins can delete resource collections (set as an array in a process.env variable?)
* Blog on Medium
* Terms of Use (in footer?)
    * Civility and IP disclaimer
    * We only keep publicly available Facebook info...
    * Help with report bug link
* Concat and uglify CSS and JS libraries
* Make images responsive
