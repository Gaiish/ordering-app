import firebase from '../config/firebase';
import { INewOrder, IOrder, IOrders } from '../models/order';

const firestore = firebase.firestore();
const ordersColl = firestore.collection('orders');

export const getAllOrders = async (): Promise<IOrders> => {
  let orders: IOrders = [];
  try {
    const snapshot = await ordersColl.get(); // could add pagination
    snapshot.forEach((doc) => {
      if (doc.data().uid) {
        orders = [...orders, (doc.data() as unknown) as IOrder];
      }
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
  data: Partial<IOrder>,
): Promise<void> => {
  try {
    await ordersColl.doc(orderId).update(data);
  } catch (error) {
    throw new Error(error);
  }
};
