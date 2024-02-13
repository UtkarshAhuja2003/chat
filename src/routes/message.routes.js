import {Router} from 'express';
import {
  sendMessage,
} from '../controllers/message.controllers.js';
import {sendMessageValidator} from '../validators/message.validators.js';

const router = Router();

router
    .route('/chat')
    .post(
        sendMessageValidator(),
        sendMessage,
    );

export default router;
