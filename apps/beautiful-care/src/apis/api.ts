import { Account, Client as Appwrite, Databases } from 'appwrite';

interface Provider {
  account: Account;
  database: Databases;
}

let provider: Provider;

export const getProvider = () => {
  if (provider) {
    return provider;
  }
  const appwrite = new Appwrite();
  appwrite
    .setEndpoint(import.meta.env.VITE_ENDPOINT)
    .setProject(import.meta.env.VITE_PROJECT_ID);
  const account = new Account(appwrite);
  const database = new Databases(appwrite);
  provider = { account, database };
  return { account, database };
};

export const api = {
  createAccount: (email: string, password: string, name: string) => {
    return getProvider().account.create('unique()', email, password, name);
  },

  getAccount: () => {
    const account = getProvider().account;
    return account.get();
  },

  createSession: (email: string, password: string) => {
    return getProvider().account.createEmailSession(email, password);
  },

  deleteCurrentSession: () => {
    return getProvider().account.deleteSession('current');
  },
};
