import dotenv from 'dotenv';
import {httpServer} from './app.js';

dotenv.config({
  path: './.env',
});

const startServer = () => {
  httpServer.listen(process.env.PORT || 8080, () => {
    console.log('Server is running on port: ' + process.env.PORT);
  });
};

try {
  startServer();
} catch (err) {
  console.error('An error occurred while starting the server');
  console.error(err);
  process.exit(1);
}
