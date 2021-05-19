import firebase from '../config/firebase';
import { IOrders } from '../interfaces/order.interface';

export const initTestDB = async () => {
  const firestore = firebase.firestore();

  let orders: IOrders = [];
  for (let i = 0; i < 20; i++) {
    const ID = Math.floor(Math.random() * 100);
    orders.push({
      address: {
        city: `City ${ID}`,
        country: `Country ${ID}`,
        street: `St ${ID}`,
        zip: '13055',
      },
      bookingDate: 1554284950010 + ID,
      customer: {
        email: `user${ID}@gmail.com`,
        name: `User ${ID}`,
        phone: '015252098067',
      },
      title: `Test Order ${ID}`,
      uid: `uid-${i}`,
    });
  }

  try {
    for (let i = 0; i < orders.length; i++) {
      await firestore.collection('orders').doc(orders[i].uid).set(orders[i]);
    }
  } catch (error) {
    console.log(error);
  }
};
