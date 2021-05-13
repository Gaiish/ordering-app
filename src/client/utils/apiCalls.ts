import axios, { AxiosResponse } from 'axios';
import { IOrder, IOrderUpdate, INewOrder } from './app-types';

const BACKEND_API_URL = process.env.BACKEND_API_URL;

interface requestConfig {
  authToken: string;
}

const headersConfig = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const getOrders = async ({
  authToken,
}: requestConfig): Promise<AxiosResponse<IOrder[]>> => {
  const res = await axios.get(`${BACKEND_API_URL}/orders`, {
    headers: {
      ...headersConfig,
      Authorization: `Bearer ${authToken}`,
    },
  });
  return res.data;
};

export const createOrder = async (
  order: INewOrder,
  { authToken }: requestConfig,
): Promise<AxiosResponse> => {
  const res = await axios.post(`${BACKEND_API_URL}/orders`, order, {
    headers: {
      ...headersConfig,
      Authorization: `Bearer ${authToken}`,
    },
  });
  return res.data;
};

export const updateOrder = async (
  orderUpdate: IOrderUpdate,
  orderId: string,
  { authToken }: requestConfig,
): Promise<AxiosResponse> => {
  return axios.put(`${BACKEND_API_URL}/orders/${orderId}`, orderUpdate, {
    headers: {
      ...headersConfig,
      Authorization: `Bearer ${authToken}`,
    },
  });
};
