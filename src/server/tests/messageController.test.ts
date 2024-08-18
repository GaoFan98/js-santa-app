import request from 'supertest';
import app from '../app';
import validationService from '../services/validationService';
import messageQueue from '../queues/messageQueue';

jest.mock('../services/validationService');
jest.mock('../queues/messageQueue');

describe('Message Controller', () => {
  const validChildId = '730b0412-72c7-11e9-a923-1681be663d3e';
  const validMessage = 'Dear Santa, I have been good this year!';

  beforeEach(() => {
    jest.clearAllMocks(); 

    (validationService.validateChild as jest.Mock).mockResolvedValue({
      isValid: true,
      childName: 'charlie.brown',
      childAddress: 'Address 1',
    });

    (messageQueue.enqueueMessage as jest.Mock).mockResolvedValue(true);
  });

  it('should return 200 for a valid message submission', async () => {
    const response = await request(app)
      .post('/api/send-message')
      .send({ childId: validChildId, message: validMessage });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.childName).toBe('charlie.brown');
    expect(response.body.childAddress).toBe('Address 1');
  });

  it('should return 400 for an invalid child ID', async () => {
    (validationService.validateChild as jest.Mock).mockResolvedValue({
      isValid: false,
      error: 'Child not registered.',
    });

    const response = await request(app)
      .post('/api/send-message')
      .send({ childId: 'invalid-id', message: validMessage });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Child not registered.');
  });
});
