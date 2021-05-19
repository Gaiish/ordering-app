import firebase from '../config/firebase';
import {
  INewOrder,
  IOrder,
  IOrders,
  IOderUpdate,
} from '../interfaces/order.interface';

const firestore = firebase.firestore();
const ordersColl = firestore.collection('orders');

export interface QueryParams {
  before?: string;
  after?: string;
}

export const getAllOrders = async ({
  before,
  after,
}: QueryParams): Promise<IOrders> => {
  const limit = 5;
  let orders: IOrders = [];
  let query;
  try {
    if (after) {
      query = ordersColl.orderBy('uid', 'desc').startAfter(after).limit(limit);
    } else if (before) {
      query = ordersColl
        .orderBy('uid', 'desc')
        .endBefore(before)
        .limitToLast(limit);
    } else {
      query = ordersColl.orderBy('uid', 'desc').limit(limit);
    }

    const snapshot = await query.get();
    snapshot.forEach((doc) => {
      orders = [...orders, (doc.data() as unknown) as IOrder];
    });
  } catch (error) {
    throw new Error(error);
  }
  return orders;
};

export const createOrder = async (
  order: INewOrder,
): Promise<string | undefined> => {
  try {
    const { id } = await ordersColl.add(order);
    await ordersColl.doc(id).update({ uid: id });
    return id;
  } catch (error) {
    throw new Error(error);
  }
};

export const getOrderById = async (
  orderId: string,
): Promise<IOrder | undefined> => {
  try {
    const doc = await ordersColl.doc(orderId).get();
    if (doc.exists) {
      return (doc.data() as unknown) as IOrder;
    }
    throw new Error('Order does not exist');
  } catch (error) {
    throw new Error(error);
  }
};

export const updateOrder = async (
  orderId: string,
  data: IOderUpdate,
): Promise<void> => {
  try {
    await ordersColl.doc(orderId).update(data);
  } catch (error) {
    throw new Error(error);
  }
};
