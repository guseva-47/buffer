import express, { json } from 'express';
import recorsdRouter from './record/records.router.js';

const app = express();

app.use(json());
app.use('/api', recorsdRouter);

export default app;
