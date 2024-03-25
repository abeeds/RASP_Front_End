# To-Do List
- Write a home page greeting the user
- Add polling for messages page to display new messages in real time
    - might cause problems with the mongodb free tier limits
- Improve CSS in messages page
    - Add an edit message option
    - add word wrap to message bar
- Use cookies to store logged-in state (also requires backend changes)
    - implement some kind of login token so login info isnt stored in plain text
    - add some limitation so you can't just clear cookies and re login, which would
    fill the DB up
- Have navbar update upon login to show relevant tabs
- Hide the send message bar from users if not logged in
- Profile page letting the user edit their username/password
    - this should replace the position of login in the navbar
- Add restrictions to the username and password in register form
    - no punctuation
    - username can't be admin
    - character limits
