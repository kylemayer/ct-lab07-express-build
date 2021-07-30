import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import frogsController from './controllers/frogs';

const app = express();

app.use(express.json());

app.use('/api/v1/frogs', frogsController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
