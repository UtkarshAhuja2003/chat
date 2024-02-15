<p  align="center">
<a  href="https://nextjs.org"  target="_blank"><img  height="120"  src="https://github.com/UtkarshAhuja2003/chat/assets/70762626/c1104dff-e3a2-42cf-97dc-ad8b724b7de3"  alt="Next Logo"></a> <a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
<a  href="https://nodejs.org"  target="_blank"><img   height="120"  src="https://github.com/UtkarshAhuja2003/chat/assets/70762626/950dff10-3ec7-4270-8bd0-376708b4a3fa"  alt="Node Logo"></a><a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
<a  href="https://socket.io"  target="_blank"><img   height="120"  src="https://github.com/UtkarshAhuja2003/chat/assets/70762626/9db07c60-8461-4db5-9c63-fae52f28858c"  alt="Socket-io Logo"></a>
</p>


# Chat-App

This is a chat app made using Nextjs,TypeScript, Node and Socket.io

## Features

- User can join Chat Room by entering their name
- Multiple Users can join the chat room and start chatting
- Sender's username and timestamp visible with every message

## Installation

Clone the repository:
```bash
git clone https://github.com/UtkarshAhuja2003/chat.git
```
Navigate to the project folder:
```bash
cd chat
```

### Backend

1. Install dependencies in root folder
```bash
npm install
```
2. Copy sample env to .env
```bash
cp .env.sample .env
```
  Change URL and port if changed in frontend
3. Start the server
 ```bash
 npm start
 ```

### Frontend

1. Navigate to client directory
```bash
cd client
```
2. Install dependencies in client
```bash
npm install
```
2. Copy sample env to .env
```bash
cp .env.sample .env
```
3. Start the nextjs app in development
 ```bash
 npm run dev
 ```


**Now your Project is ready to run.**

## File Structure

```bash
.
├──src # backend 
    ├── controllers # route controller
    ├── routes # Custom routes
    ├── socket # Socket Initialisation
    ├── validators
    ├── utils # Misc tools and stuffs
    │   ├── APIError
    │   ├── Async Handler
    │   └── APIResponse
    ├── app.js
    ├── index.js # entry file 
    └── constant.js
└── client # frontend directory
    ├── src
    │   ├── api
    │   ├── app
    │   │    ├── chat #page
    │   │    └── login #page
    │   ├── components
    │   │     ├── Connection
    │   │     └── Message
    │   ├── context
    │   ├── interfaces
    │   └── utils # Misc tools and stuffs
    └── public
```


### Screenshots
![image](https://github.com/UtkarshAhuja2003/chat/assets/70762626/53efc0ba-b0b9-409a-802a-d1609311bd93)
![image](https://github.com/UtkarshAhuja2003/chat/assets/70762626/6be188fe-1838-4f1c-a7d3-4e3bea927a9b)
![image](https://github.com/UtkarshAhuja2003/chat/assets/70762626/107167e7-0865-41ff-9db4-f0dce8b3ea94)
![image](https://github.com/UtkarshAhuja2003/chat/assets/70762626/759fbdc8-3197-4554-9305-45a20dceb689)



