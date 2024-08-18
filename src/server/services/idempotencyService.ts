const processedRequests = new Map<string, any>();

const isRequestProcessed = (id: string): boolean => {
  return processedRequests.has(id);
};

const markRequestProcessed = (id: string, response: any): void => {
  processedRequests.set(id, response);
};

const getCachedResponse = (id: string): any => {
  return processedRequests.get(id);
};

const cacheResponse = (id: string, response: any): void => {
  processedRequests.set(id, response);
};

export default { isRequestProcessed, markRequestProcessed, getCachedResponse, cacheResponse };
