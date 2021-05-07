import express from 'express';
import firebase from './config/firebase';

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (_, res) => {
  res.status(200).json({ msg: 'ordering app' });
});

app.listen(PORT, () => console.log(`> Ready on port ${PORT}`));
