import {io} from 'socket.io-client';

const URL = process.env.NODE_SOCKET_URI || 'http://chat-app-backend-6lg7.onrender.com:8080';

export const socket = io(URL);
