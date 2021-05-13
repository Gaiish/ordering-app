export interface IAddress {
  city: string;
  country: string;
  street: string;
  zip: string;
}

export interface ICustomer {
  email: string;
  name: string;
  phone: string;
}

export interface IOrder {
  address: IAddress;
  bookingDate: number;
  customer: ICustomer;
  title: string;
  uid: string;
}

export type INewOrder = Omit<IOrder, 'uid'>;

export interface IOrderUpdate {
  title: string;
  bookingDate: number;
}
