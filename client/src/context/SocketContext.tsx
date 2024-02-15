import {io} from 'socket.io-client';

const URL = process.env.NODE_SOCKET_URI || 'https://chat-app-backend-6lg7.onrender.com';

export const socket = io(URL);
