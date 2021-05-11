import { IOrder, IOrders, INewOrder } from '../../models/order';
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
} from '../orders.service';

describe('orders service', () => {
  it('getAllOrders should resolve all orders', async () => {
    const orders: IOrders = await getAllOrders();
    expect(orders).toEqual(expect.arrayContaining(orders));
  });

  it('getOrderById should resolve order with given id', async () => {
    const orderId = 'hKlIKPoZc2xCKGTUKZK2';
    const order: IOrder | undefined = await getOrderById(orderId);

    expect(order).toEqual({
      title: 'UPDATED TITLE',
      bookingDate: 1554284950000,
    });
  });

  it('createOrder should resolve id of newly created order', async () => {
    const order: INewOrder = {
      address: {
        city: 'Berlin',
        country: 'Germany',
        street: 'Str. 12',
        zip: '13055',
      },
      bookingDate: Date.now(),
      customer: {
        email: 'user1@email.com',
        name: 'User 1',
        phone: '015252098067',
      },
      title: 'New order from user 1',
    };

    const orderId = await createOrder(order);
    expect(orderId).toEqual(orderId);
  });

  it('updateOrder should resolve nothing after updating order', async () => {
    const orderId = '5060a7738ac5d5d8c4412';
    const update = {
      title: 'New title - updated',
      bookingDate: Date.now(),
    };

    const res = await updateOrder(orderId, update);
    expect(res).toEqual(undefined);
  });
});
