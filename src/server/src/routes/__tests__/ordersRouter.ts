import request from 'supertest';
import server from '../../server';

describe('ordersRouter', () => {
  it("should not pass if request doesn't have authorization token", async () => {
    await request(server).get('/orders').expect(403);
  });
});
