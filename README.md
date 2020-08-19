# Chatter App

Simple node and angular chat app


## Tech

- [Angular](https://angular.io/)
- [node.js](https://nodejs.org/) - Express
- [Socket](https://socket.io/)
- [MongoDB](https://www.mongodb.com/)

## Implementation

- **Organisation register** (without email confirmation) **Assumption**: email verification is not reqd as in a real world scenario it will be paid account.
- **User register**
  - Google register - directly logs in the user
  - App register - email confirmation is sent for account verification
  - Organisation has to be created to register user
- **Login** - Acc. to the given requirement all the users will login through google **Assumption**:
  - As all the users are reqd to login through google so login form has not been provided and even if the user registers from app, the account has to be a google account to login
  - This is different implementation of not providing login form is bit strange but I assumed this has been done to increase the complexity of the assignment.
- **Chat** - Can send message to all the members of organisation
  - Chat will be realtime
  - It will fetch previous chats will all the users
- **Admin** - 3 types of roles have been defined in the system 'user','admin' and 'orgAdmin'
- **Admin Action** - Admin can see a dropdown next to all the users to perform the below actions:
  - Block/Unblock user
  - Grant/Revoke admin access
  - Delete user(currently deleting only user not messages)
    _(user with admin accesss cannot perform these actions on orgAdmin)_

> The implementation has been kept simple for the sake of assignment


## Enhencements + Future scope

> Different chat applications like whatsapp,microsoft teams,fb messenger,snapchat have different implementation.

> We can have messages schema in either in form of thread stored in single document or store messages individualy

> Apps like Whatsapp,Teams like to store data locally for easy access

> Apps like Snapchat deletes the message after it is read , so no need to maintain any meta data for message

> There are so many small small features that one app has and other doesn't so it basically comes down to the kind of app behaviour we want and also the user base So there is no one correct way to implement this

- allow user to open only in one chat window
- Refresh token implementation
- reset/forgot password implementation
- Pagination for fetching the number of chats
- pagination for fetching number of chats from a particular user
- Unread messages count
- online/offline status
- search for users
- attach images/videos
- end to end encryption
- group messaging
- typing indicators
- Delete messages
  etc

