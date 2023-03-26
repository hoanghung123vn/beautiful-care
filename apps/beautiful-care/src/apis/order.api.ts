import { Models, Query } from 'appwrite';
import { getProvider } from './api';

export const databaseId = import.meta.env.VITE_DATABASE_ID;
export const collectionId = import.meta.env.VITE_ORDER_COLLETION_ID;

export interface OrderRequest {
  customerId: string;
  customerName: string;
  customerPhone: string;
  employeeId: string;
  employeeName: string;
  totalPrice: number;
  subTotalPrice: number;
  discountAmount: number;
  serviceIds: string[];
  serviceNames: string[];
  servicePrices: number[];
  serviceQuantities: number[];
}

export type Order = Required<OrderRequest> & Models.Document;

export const orderApi = {
  getOrders: (queries: string[]) => {
    return getProvider().database.listDocuments<Order>(
      databaseId,
      collectionId,
      [...queries, Query.orderDesc('$createdAt')]
    );
  },
  getOrder: (id: string) => {
    return getProvider().database.getDocument<Order>(
      databaseId,
      collectionId,
      id
    );
  },
  createOrder: (data: OrderRequest) => {
    return getProvider().database.createDocument<Order>(
      databaseId,
      collectionId,
      'unique()',
      data
    );
  },
  updateOrder: (documentId: string, data: Partial<OrderRequest>) => {
    return getProvider().database.updateDocument<Order>(
      databaseId,
      collectionId,
      documentId,
      data
    );
  },
  deleteOrder: (documentId: string) => {
    return getProvider().database.deleteDocument(
      databaseId,
      collectionId,
      documentId
    );
  },
};
