import idempotencyService from '../services/idempotencyService';

describe('Idempotency Service', () => {
  const requestKey = 'test-key';
  const response = { success: true };

  it('should cache a response', () => {
    idempotencyService.cacheResponse(requestKey, response);
    const cachedResponse = idempotencyService.getCachedResponse(requestKey);
    expect(cachedResponse).toEqual(response);
  });

  it('should check if a request has been processed', () => {
    const isProcessed = idempotencyService.isRequestProcessed(requestKey);
    expect(isProcessed).toBe(true);
  });

  it('should return undefined for unprocessed requests', () => {
    const unprocessedKey = 'unprocessed-key';
    const cachedResponse = idempotencyService.getCachedResponse(unprocessedKey);
    expect(cachedResponse).toBeUndefined();
  });
});
