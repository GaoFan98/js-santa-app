import amqp, { Channel } from 'amqplib';
import { Message } from '../types';

let channel: Channel;
const maxRetries = 5;
let retryCount = 0;

const connectRabbitMQ = async () => {
  while (retryCount < maxRetries) {
    try {
      const connection = await amqp.connect('amqp://queue');
      channel = await connection.createChannel();
      await channel.assertQueue('messageQueue', { durable: true });
      console.log('Connected to RabbitMQ');
      retryCount = 0;
      break;
    } catch (error) {
      console.error(`Failed to connect to RabbitMQ (Attempt ${retryCount + 1}/${maxRetries})`, error);
      retryCount++;
      if (retryCount >= maxRetries) {
        console.error('Max retries reached. Exiting...');
        process.exit(1);
      }
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
};

const enqueueMessage = async (message: Message) => {
  if (!channel) {
    await connectRabbitMQ();
  }
  channel.sendToQueue('messageQueue', Buffer.from(JSON.stringify(message)), {
    persistent: true,
  });
};

const consumeMessages = async (callback: (msg: Message) => void) => {
  if (!channel) {
    await connectRabbitMQ();
  }
  channel.consume('messageQueue', (msg) => {
    if (msg !== null) {
      const parsedMessage = JSON.parse(msg.content.toString()) as Message;
      callback(parsedMessage);
      channel.ack(msg);
    }
  });
};

export default { enqueueMessage, consumeMessages };
