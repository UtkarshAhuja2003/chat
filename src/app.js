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
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  },
});

app.set('io', io);

app.use(
    cors({
      origin:
        process.env.CORS_ORIGIN === '*' ?
          '*' : // allow all origins
          process.env.CORS_ORIGIN?.split(','),
      credentials: true,
    }),
);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(messageRouter);
initializeSocketIO(io);

export {httpServer};
