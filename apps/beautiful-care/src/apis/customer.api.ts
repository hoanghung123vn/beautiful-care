import { Models } from 'appwrite';
import { databaseId, getProvider } from './api';

export const collectionId = '6416c494d83da841095b';

export interface CustomerRequest {
  name: string;
  phone: string;
  email?: string;
  totalUsedTimes?: number;
  totalSpend?: number;
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
