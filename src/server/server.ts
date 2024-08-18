import app from './app';
import { queueWorker } from './workers/emailWorker';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  queueWorker(); 
});
