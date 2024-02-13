import {ChatEventEnum} from '../constants.js';


const mountParticipantTypingEvent = (socket) => {
  socket.on(ChatEventEnum.TYPING_EVENT, () => {
    socket.in('chat-room').emit(ChatEventEnum.TYPING_EVENT);
  });
};

const mountParticipantStoppedTypingEvent = (socket) => {
  socket.on(ChatEventEnum.STOP_TYPING_EVENT, () => {
    socket.in('chat-room').emit(ChatEventEnum.STOP_TYPING_EVENT);
  });
};

const initializeSocketIO = (io) => {
  return io.on('connection', async (socket) => {
    try {
      socket.join('chat-room');
      socket.emit(ChatEventEnum.CONNECTED_EVENT);
      console.log('User connected');

      mountParticipantTypingEvent(socket);
      mountParticipantStoppedTypingEvent(socket);

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

const emitSocketEvent = (req, event, payload) => {
  req.app.get('io').in('chat-room').emit(event, payload);
};

export {initializeSocketIO, emitSocketEvent};
