import messageQueue from '../queues/messageQueue';
import emailService from '../services/emailService';
import retryHandler from '../middlewares/retryHandler';
import { Message } from '../types';
import { saveEvent } from '../services/eventStoreService';

const pendingMessages: Message[] = [];

export const queueWorker = () => {
  setInterval(async () => {
    if (pendingMessages.length > 0) {
      const aggregatedMessages = [...pendingMessages];
      pendingMessages.length = 0;

      const emailContent = aggregatedMessages.map((message) =>
        `Child: ${message.childName}\nAddress: ${message.childAddress}\nMessage: ${message.message}\n\n`
      ).join('');

      const emailData = {
        from: 'do_not_reply@northpole.com',
        to: 'santa@northpole.com',
        subject: 'New Messages to Santa',
        text: emailContent,
      };

      try {
        await retryHandler(() => emailService.sendEmail(emailData), 3, 1000);
        console.log(`Processed ${aggregatedMessages.length} messages`);
        await saveEvent('EMAIL_SENT', { messages: aggregatedMessages });
      } catch (error) {
        console.error('Failed to send aggregated email:', error);
        await saveEvent('EMAIL_SEND_FAILED', { messages: aggregatedMessages, error });
      }
    }
  }, 15000);

  messageQueue.consumeMessages((message: Message) => {
    pendingMessages.push(message);
    console.log('Message added to pending queue:', message);
  });
};
