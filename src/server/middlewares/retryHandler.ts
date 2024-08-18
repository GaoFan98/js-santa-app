const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const retryHandler = async (fn: Function, retries: number = 3, delay: number = 1000) => {
  let attempt = 0;
  while (attempt < retries) {
    try {
      return await fn();
    } catch (error) {
      attempt++;
      if (attempt >= retries) {
        throw error; 
      }
      await sleep(delay); 
    }
  }
};

export default retryHandler;
