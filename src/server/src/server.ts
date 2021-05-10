import express from 'express';
import cors from 'cors';

import ordersRouter from './routes/ordersRouter';

const server = express();

server.use(express.json());
server.use(cors());

server.use('/orders', ordersRouter);

server.use((_, res) => {
  res.send('Ordering app backend: Nothing here!');
});

export default server;
