import { Account, Client as Appwrite, Databases } from 'appwrite';

export const databaseId = '6416c39d4dea0ba745f5';

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
    .setEndpoint('http://localhost:3000/v1')
    .setProject('6415ced2cba09276fd31');
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
    let account = getProvider().account;
    return account.get();
  },

  createSession: (email: string, password: string) => {
    return getProvider().account.createEmailSession(email, password);
  },

  deleteCurrentSession: () => {
    return getProvider().account.deleteSession('current');
  },
};
