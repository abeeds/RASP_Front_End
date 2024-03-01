# To-Do List
- Write a home page greeting the user
- Add polling for messages page to display new messages in real time
    - might cause problems with the mongodb free tier limits
- Login and Register forms are separated but if the passwords don't match in
  the register form, it reloads to the login form 
- Improve CSS in messages page
    - also need to reformat the date for the front end
    - adjust timezone maybe
- Use cookies to store logged-in state (also requires backend changes)
    - implement some kind of login token so login info isnt stored in plain text
    - add some limitation so you can't just clear cookies and re login, which would
    fill the DB up
- Have navbar update upon login to show relevant tabs
- Lock users out of '/chatrooms' if not logged in
    - maybe a redirect upon checking the cookie
- Profile page letting the user edit their username/password
    - this should replace the position of login in the navbar
- Add restrictions to the username and password in form
    - no punctuation
    - username can't be admin
    - character limits
