import express from 'express';
import {
  getAllOrders,
  createOrder,
  getOrderById,
  updateOrder,
  QueryParams,
} from '../services/orders.service';
import { IOrder, IOrders } from '../interfaces/order.interface';
import verifyAuthorization from '../middlewares/authorization';

const ordersRouter = express.Router();

ordersRouter.use(verifyAuthorization);

ordersRouter.get('/', async (req, res) => {
  const { before } = req.query;
  const { after } = req.query;
  let orders: IOrders = [];
  try {
    orders = await getAllOrders({ before, after } as QueryParams);
    res.status(200).json({
      status: 200,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

ordersRouter.get('/:id', async (req, res) => {
  try {
    const order: IOrder | undefined = await getOrderById(req.params.id);
    if (order) {
      res.status(200).json({
        status: 200,
        data: order,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: 'Order not found',
      });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

ordersRouter.post('/', async (req, res) => {
  try {
    const orderId = await createOrder(req.body);
    res.status(201).json({
      status: 201,
      message: 'New order created!',
      data: { orderId },
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

ordersRouter.put('/:id', async (req, res) => {
  try {
    await updateOrder(req.params.id, req.body);
    res.status(200).json({ status: 200, message: 'Success, order updated' });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
});

export default ordersRouter;
