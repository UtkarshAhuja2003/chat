/**
 * @description set of events that we are using in chat app.
 */
export const ChatEventEnum = Object.freeze({
  // once user is ready to go
  CONNECTED_EVENT: 'connected',
  // when user gets disconnected
  DISCONNECT_EVENT: 'disconnect',
  // when user joins a socket room
  JOIN_CHAT_EVENT: 'joinChat',
  // when participant leaves the chat
  LEAVE_CHAT_EVENT: 'leaveChat',
  // when new message is received
  MESSAGE_RECEIVED_EVENT: 'messageReceived',
  // when there is new user in chat
  NEW_CHAT_EVENT: 'newChat',
  // when there is an error in socket
  SOCKET_ERROR_EVENT: 'socketError',
});

export const AvailableChatEvents = Object.values(ChatEventEnum);
