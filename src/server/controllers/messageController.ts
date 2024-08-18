import { Request, Response } from 'express';
import validationService from '../services/validationService';
import messageQueue from '../queues/messageQueue';
import idempotencyService from '../services/idempotencyService';
import { Message } from '../types';

export const sendMessage = async (req: Request, res: Response) => {
  const { childId, message } = req.body;
  const requestKey = `${childId}-${message}`;

  const cachedResponse = idempotencyService.getCachedResponse(requestKey);
  if (cachedResponse) {
    return res.status(200).json(cachedResponse);
  }

  try {
    const validation = await validationService.validateChild(childId);
    if (!validation.isValid && 'error' in validation) {
      return res.status(400).json({ success: false, message: validation.error });
    }

    const { childName, childAddress } = validation;
    const messageData: Message = { childId, message, childName: childName!, childAddress: childAddress! };
    await messageQueue.enqueueMessage(messageData);

    const response = { success: true, childName, childAddress };
    idempotencyService.cacheResponse(requestKey, response);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error, please try again.' });
  }
};
