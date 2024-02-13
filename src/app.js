import cors from 'cors';
import express from 'express';
import {createServer} from 'http';
import {rateLimit} from 'express-rate-limit';
import {Server} from 'socket.io';

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

// global middlewares
app.use(
    cors({
      origin:
        process.env.CORS_ORIGIN === '*' ?
          '*' : // allow all origins
          process.env.CORS_ORIGIN?.split(','),
      credentials: true,
    }),
);

// Rate limiter to avoid misuse of the service and avoid cost spikes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 500, // Limit each IP to 500 req per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  keyGenerator: (req, res) => {
    return req.clientIp; // IP address from requestIp.mw(), as opposed to req.ip
  },
  handler: (_, __, ___, options) => {
    throw new ApiError(
        options.statusCode || 500,
        `There are too many requests. You are only allowed ${
          options.limit
        } requests per ${options.windowMs / 60000} minutes`,
    );
  },
});

app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

export {httpServer};
