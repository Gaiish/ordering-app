import express from 'express';
import cors from 'cors';

import ordersRouter from './routes/ordersRouter';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/orders', ordersRouter);

app.use((_, res) => {
  res.send('Ordering app backend: Nothing here!');
});

app.listen(PORT, () => console.log(`> Ready on port ${PORT}`));
