import { Models, Query } from 'appwrite';
import { getProvider } from './api';

export const databaseId = import.meta.env.VITE_DATABASE_ID;
export const collectionId = import.meta.env.VITE_COMBO_COLLETION_ID;

export interface ComboRequest {
  name: string;
  serviceId: number;
  quantity: number;
  description: string;
  price: number;
}

export type Combo = Required<ComboRequest> & Models.Document;

export const comboApi = {
  getCombos: (queries: string[]) => {
    return getProvider().database.listDocuments<Combo>(
      databaseId,
      collectionId,
      [...queries, Query.orderDesc('$createdAt')]
    );
  },
  getCombo: (id: string) => {
    return getProvider().database.getDocument<Combo>(
      databaseId,
      collectionId,
      id
    );
  },
  createCombo: (data: ComboRequest) => {
    return getProvider().database.createDocument<Combo>(
      databaseId,
      collectionId,
      'unique()',
      data
    );
  },
  updateCombo: (documentId: string, data: Partial<ComboRequest>) => {
    return getProvider().database.updateDocument<Combo>(
      databaseId,
      collectionId,
      documentId,
      data
    );
  },
  deleteCombo: (documentId: string) => {
    return getProvider().database.deleteDocument(
      databaseId,
      collectionId,
      documentId
    );
  },
};
