# Arabic Music Research homepage

### Built on React.js using Node.js, Express.js, and MongoDB

Development page is live at [https://whispering-sands-88923.herokuapp.com](https://whispering-sands-88923.herokuapp.com).

Next Up
* Split resources and notices pages
* Google login
    * Buttons:
        * When logged out: G and F logins.          Hide F logout, G logout, User
        * When logged in with F: F logout, User     Hide G login, G logout, F login
        * When logged in with G: G logout, User     Hide F login, F logout, G login
    * Find or create based on email instead of service ID? Allows for multiple services
* Validation issues
    * Submit button only validates after key entry
    * Return to form validation, optional items should not validate

Eventually:
* Member info page to display and edit user info
* Directory displays information on each member
* Only admins can delete resource collections (set as an array in a process.env variable?)
* Blog on Medium
* Terms of Use
    * Civility and IP disclaimer
    * We only keep publicly available Facebook info...
* Concat and uglify CSS and JS libraries
* Make images responsive
