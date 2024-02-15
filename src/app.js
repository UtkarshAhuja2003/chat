import cors from 'cors';
import express from 'express';
import {createServer} from 'http';
import {Server} from 'socket.io';
import {initializeSocketIO} from './socket/index.js';
import messageRouter from './routes/message.routes.js';

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.set('io', io);

app.use(
    cors({
      origin:
        'http://localhost:3000',
      credentials: true,
    }),
);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1/chat-app/messages', messageRouter);
initializeSocketIO(io);

export {httpServer};
