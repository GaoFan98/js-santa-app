import { Message } from '../types';
import messageQueue from '../queues/messageQueue';
import { saveEvent } from '../services/eventStoreService';

export const sendMessageCommand = async (messageData: Message) => {
  await saveEvent('MESSAGE_SENT', messageData);
  await messageQueue.enqueueMessage(messageData);
};
