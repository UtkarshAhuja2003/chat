import {ChatEventEnum} from '../constants.js';

const initializeSocketIO = (io) => {
  return io.on('connection', async (socket) => {
    try {
      socket.join('chat-room');
      socket.emit(ChatEventEnum.CONNECTED_EVENT);
      console.log('User connected');

      socket.on(ChatEventEnum.DISCONNECT_EVENT, () => {
        console.log('user has disconnected');
        socket.leave();
      });
    } catch (error) {
      socket.emit(
          ChatEventEnum.SOCKET_ERROR_EVENT,
          error?.message || 'Something went wrong while connecting.',
      );
    }
  });
};

const emitSocketEvent = (req, content, username, timestamp) => {
  const message = {
    content,
    username,
    timestamp,
  };
  req.app.get('io').emit(ChatEventEnum.MESSAGE_RECEIVED_EVENT, message);
};

export {initializeSocketIO, emitSocketEvent};
