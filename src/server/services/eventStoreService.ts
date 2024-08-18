import { MongoClient, Db } from 'mongodb';

let db: Db;

const connectMongo = async () => {
  if (!db) {
    const client = new MongoClient('mongodb://mongodb:27017');
    await client.connect();
    db = client.db('eventstore');
  }
};

export const saveEvent = async (eventType: string, eventData: any) => {
  await connectMongo();
  const event = {
    eventType,
    eventData,
    timestamp: new Date(),
  };
  await db.collection('events').insertOne(event);
};

export const getEvents = async (eventType?: string) => {
  await connectMongo();
  const query = eventType ? { eventType } : {};
  return await db.collection('events').find(query).toArray();
};
