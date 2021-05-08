import express from 'express';
import {
  getAllOrders,
  createOrder,
  getOrderById,
  updateOrder,
} from '../services/orders.service';
import { IOrder, IOrders } from '../models/order';
import verifyAuthorization from '../middlewares/authorization';

const ordersRouter = express.Router();

ordersRouter.use(verifyAuthorization);

ordersRouter.get('/', async (_, res) => {
  try {
    const orders: IOrders = await getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

ordersRouter.get('/:id', async (req, res) => {
  try {
    const order: IOrder | undefined = await getOrderById(req.params.id);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).send('Order not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

ordersRouter.post('/', async (req, res) => {
  try {
    const orderId = await createOrder(req.body);
    res.status(201).json(orderId);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

ordersRouter.put('/:id', async (req, res) => {
  try {
    await updateOrder(req.params.id, req.body);
    res.status(200).json({ message: 'success, order updated' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default ordersRouter;
