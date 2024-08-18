import Redis from 'ioredis';
import { Request, Response, NextFunction } from 'express';

const redis = new Redis({
  host: 'redis',
  port: 6379,
});

const rateLimiter = (limit: number, windowMs: number) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip;
    const key = `rate-limit:${ip}`;

    const transaction = redis.multi();

    transaction.incr(key);
    transaction.pexpire(key, windowMs);

    const results = await transaction.exec();

    if (results) {
      const [incrError, countResult] = results[0]; 
      if (incrError) throw incrError;

      if (Number(countResult) > limit) {
        return res.status(429).json({
          success: false,
          message: 'Too many requests, please try again later.',
        });
      }
    }

    next();
  };
};

export default rateLimiter;
