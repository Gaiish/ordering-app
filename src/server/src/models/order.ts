interface IAddress {
  city: string;
  country: string;
  street: string;
  zip: string;
}

interface ICustomer {
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

export type IOrders = Array<IOrder>;
