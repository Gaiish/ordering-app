import firebase from '../config/firebase';
import { IOrder, IOrders } from '../models/order';

const firestore = firebase.firestore();
const ordersColl = firestore.collection('orders');

export const getAllOrders = async (): Promise<IOrders> => {
  let orders: IOrders = [];
  try {
    const snapshot = await ordersColl.get(); // could add pagination
    snapshot.forEach((doc) => {
      orders = [...orders, (doc.data() as unknown) as IOrder];
    });
  } catch (error) {
    console.log(error);
  }
  return orders;
};

export const createOrder = async (
  order: IOrder,
): Promise<string | undefined> => {
  try {
    const { id } = await ordersColl.add(order);
    return id;
  } catch (error) {
    console.log(error);
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
    console.log('No such doc');
  } catch (error) {
    console.log(error);
  }
};

export const updateOrder = async (
  orderId: string,
  data: Partial<IOrder>,
): Promise<void> => {
  try {
    await ordersColl.doc(orderId).update(data);
  } catch (error) {
    console.log(error);
  }
};