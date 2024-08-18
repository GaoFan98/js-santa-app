import express from 'express';
import messageRoutes from './routes/messageRoutes';
import { errorHandler } from './middlewares/errorHandler';
import rateLimiter from './middlewares/rateLimiter';

const app = express();

app.use(express.json());

// 100 requests per minute
app.use(rateLimiter(100, 60000));  

app.use('/api', messageRoutes);

app.use(errorHandler);

export default app;
