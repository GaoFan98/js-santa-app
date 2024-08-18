import { Router } from 'express';
import { sendMessage, getMessageEvents } from '../controllers/messageController';

const router = Router();

router.post('/send-message', sendMessage);
router.get('/events', getMessageEvents);

export default router;
