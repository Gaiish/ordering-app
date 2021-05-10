import express from 'express';
import cors from 'cors';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';

import ordersRouter from './routes/ordersRouter';

const server = express();

const loggerOpts: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true }),
  ),
};

server.use(express.json());
server.use(cors());
server.use(expressWinston.logger(loggerOpts));

server.use('/orders', ordersRouter);

server.use((_, res) => {
  res.send('Ordering app backend: Nothing here!');
});

server.use(expressWinston.errorLogger(loggerOpts));

export default server;
