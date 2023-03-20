import { Models } from 'appwrite';
import { getProvider } from './api';

export const databaseId = import.meta.env.VITE_DATABASE_ID;
export const collectionId = import.meta.env.VITE_CUSTOMER_COLLETION_ID;

export interface CustomerRequest {
  name: string;
  phone: string;
  email?: string;
  totalUsedTimes?: number;
  totalSpend?: number;
  address?: string;
  note?: string;
  tags?: string;
}

export type Customer = Required<CustomerRequest> & Models.Document;

export const customerApi = {
  getCustomers: (queries?: string[] | undefined) => {
    return getProvider().database.listDocuments<Customer>(
      databaseId,
      collectionId,
      queries
    );
  },
  createDocument: (data: CustomerRequest) => {
    return getProvider().database.createDocument<Customer>(
      databaseId,
      collectionId,
      'unique()',
      data
    );
  },
  updateCustomer: (documentId: string, data: Partial<CustomerRequest>) => {
    return getProvider().database.updateDocument<Customer>(
      databaseId,
      collectionId,
      documentId,
      data
    );
  },
  deleteCustomer: (documentId: string) => {
    return getProvider().database.deleteDocument(
      databaseId,
      collectionId,
      documentId
    );
  },
};
