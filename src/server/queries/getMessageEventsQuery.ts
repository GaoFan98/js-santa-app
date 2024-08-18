import { getEvents } from '../services/eventStoreService';

export const getMessageEventsQuery = async () => {
  return await getEvents('MESSAGE_SENT');
};
