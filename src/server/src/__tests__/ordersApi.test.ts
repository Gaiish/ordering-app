import request from 'supertest';
import server from '../server';
import { initTestDB } from '../__mocks__/ordersDB';
import verifyAuthorization from '../middlewares/authorization';
import { INewOrder } from '../interfaces/order.interface';

jest.mock('../middlewares/authorization', () =>
  jest.fn((req, res, next) => next()),
);

describe('Orders API', () => {
  let authToken = 'token1';
  beforeAll(async () => {
    await initTestDB();
  });

  it('GET /orders/ should resolve a list of 5 orders', async () => {
    const res = await request(server).get('/orders');

    expect(verifyAuthorization).toHaveBeenCalledTimes(1);
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(5);
  });

  it('GET /orders/?after should resolve the next 5 orders', async () => {
    const res = await request(server)
      .get('/orders/?after=uid-5')
      .set('Authorization', `Bearer ${authToken}`);

    expect(verifyAuthorization).toHaveBeenCalledTimes(2);
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(5);
  });

  it('GET /orders/?before should resolve the previous 5 orders', async () => {
    const res = await request(server)
      .get('/orders/?before=uid-10')
      .set('Authorization', `Bearer ${authToken}`);

    expect(verifyAuthorization).toHaveBeenCalledTimes(3);
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(5);
  });

  it('GET /orders/:id should resolve order with given orderId', async () => {
    const orderId = 'uid-2';

    const res = await request(server)
      .get(`/orders/${orderId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(verifyAuthorization).toHaveBeenCalledTimes(4);
    expect(res.status).toBe(200);
    expect(res.body.data.uid).toEqual(orderId);
  });

  it('POST /orders/ should resolve orderId of newly created order', async () => {
    const order: INewOrder = {
      address: {
        city: 'New City',
        country: 'New Country',
        street: 'New St',
        zip: '13055',
      },
      bookingDate: 1554284950010,
      customer: {
        email: 'newUser@gmail.com',
        name: 'New User',
        phone: '015252098067',
      },
      title: 'New order',
    };
    const res = await request(server)
      .post('/orders/')
      .send(order)
      .set('Authorization', `Bearer ${authToken}`);

    expect(verifyAuthorization).toHaveBeenCalledTimes(5);
    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty('orderId');
  });

  it('PUT /orders/:id should update order', async () => {
    const orderUpdate = {
      title: 'New order 1',
      bookingDate: 1554284950012,
    };
    const res = await request(server)
      .put('/orders/uid-1')
      .send(orderUpdate)
      .set('Authorization', `Bearer ${authToken}`);

    expect(verifyAuthorization).toHaveBeenCalledTimes(6);
    expect(res.status).toBe(200);
    expect(res.body.message).toEqual('Success, order updated');
  });
});
