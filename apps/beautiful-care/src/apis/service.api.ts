import { Models, Query } from 'appwrite';
import { getProvider } from './api';

export const databaseId = import.meta.env.VITE_DATABASE_ID;
export const collectionId = import.meta.env.VITE_SERVICE_COLLETION_ID;

export interface ServiceRequest {
  name: string;
  price: number;
  description: string;
}

export type Service = Required<ServiceRequest> & Models.Document;

export const serviceApi = {
  getServices: (queries: string[]) => {
    return getProvider().database.listDocuments<Service>(
      databaseId,
      collectionId,
      [...queries, Query.orderDesc('$createdAt')]
    );
  },
  getService: (id: string) => {
    return getProvider().database.getDocument<Service>(
      databaseId,
      collectionId,
      id
    );
  },
  createService: (data: ServiceRequest) => {
    return getProvider().database.createDocument<Service>(
      databaseId,
      collectionId,
      'unique()',
      data
    );
  },
  updateService: (documentId: string, data: Partial<ServiceRequest>) => {
    return getProvider().database.updateDocument<Service>(
      databaseId,
      collectionId,
      documentId,
      data
    );
  },
  deleteService: (documentId: string) => {
    return getProvider().database.deleteDocument(
      databaseId,
      collectionId,
      documentId
    );
  },
};
