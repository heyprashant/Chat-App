# Chat-room-App
Chat Room App | <a href="https://heyprashant-chat-app.herokuapp.com/">Live Demo</a>

A realtime application with websockets - <a href="https://socket.io/">socket.io</a>. This allow us to setup application with real time Bi-directional communication, where the client can send information to the server and the server can send info to client. Over this persistent connection user can join or create a room and chat with individuals or group in that specific room.

### *Features includes:*
 User can create a room, join currently active Chatroom, send messages in that room, and Share current location. As users enter and leave the room, the room list updates and an Admin message announces the changes. And more features like profanity checker, auto-Scrollable chat, mobile responsive.

### *Other libraries used:*
<a href="https://www.npmjs.com/package/mustache"> mustache.js </a> , <a href="https://momentjs.com/">moment.js</a>, <a href="https://www.npmjs.com/package/bad-words">bad-words</a>


### *Running locally in your machine*
To get started, just clone the repository and run ```npm install```:
```
git clone https://github.com/heyprashant/Chat-App.git
npm install
npm run dev
```
