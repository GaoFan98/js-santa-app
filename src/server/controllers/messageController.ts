import { Request, Response } from 'express';
import idempotencyService from '../services/idempotencyService';
import { sendMessageCommand } from '../commands/sendMessageCommand';
import { getMessageEventsQuery } from '../queries/getMessageEventsQuery';
import { validateChildCommand } from '../commands/validateChildCommand';

export const sendMessage = async (req: Request, res: Response) => {
  const { childId, message } = req.body;
  const requestKey = `${childId}-${message}`;

  const cachedResponse = idempotencyService.getCachedResponse(requestKey);
  if (cachedResponse) {
    return res.status(200).json(cachedResponse);
  }

  try {
    const validation = await validateChildCommand(childId);
    if (!validation.isValid) {
      return res.status(400).json({ success: false, message: validation.error });
    }

    await sendMessageCommand({ childId, message, childName: validation.childName!, childAddress: validation.childAddress! });

    const response = { success: true, childName: validation.childName, childAddress: validation.childAddress };
    idempotencyService.cacheResponse(requestKey, response);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error, please try again.' });
  }
};

export const getMessageEvents = async (req: Request, res: Response) => {
  try {
    const events = await getMessageEventsQuery();
    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve events.' });
  }
};
