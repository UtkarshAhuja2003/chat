import {emitSocketEvent} from '../socket/index.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js';


const sendMessage = asyncHandler(async (req, res) => {
  const {content} = req.body;
  const {username} = req.body;
  const {timestamp} = req.body;
  if (!content) {
    throw new ApiError(400, 'Message content is required');
  }

  emitSocketEvent(req, content, username, timestamp);

  return res
      .status(201)
      .json(new ApiResponse(201, 'Message saved successfully'));
});

export {sendMessage};
