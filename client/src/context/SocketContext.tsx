import {io} from 'socket.io-client';

const URL = process.env.NODE_SOCKET_URI || 'http://localhost:8080';

export const socket = io(URL);
