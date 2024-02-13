import {ChatEventEnum} from '../constants.js';
import {emitSocketEvent} from '../socket/index.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js';


const sendMessage = asyncHandler(async (req, res) => {
  const {content} = req.body;
  const {senderName} = req.body;

  if (!content) {
    throw new ApiError(400, 'Message content is required');
  }

  const io = req.app.get('io');

  // emit the message to all connected sockets except the sender
  io.sockets.sockets.forEach((socket) => {
    const participant = socket.username;
    if (participant !== senderName) {
      emitSocketEvent(
          req,
          senderName,
          ChatEventEnum.MESSAGE_RECEIVED_EVENT,
      );
    }
  });

  return res
      .status(201)
      .json(new ApiResponse(201, receivedMessage, 'Message saved successfully'));
});

export {sendMessage};
