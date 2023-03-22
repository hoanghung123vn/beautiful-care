import { formatDate } from '@beautiful-care/ui-component';
import { useEffect, useReducer } from 'react';
import { api } from '../apis/api';
import { Customer, customerApi } from '../apis/customer.api';

export const FetchState = {
  FETCH_INIT: 0,
  FETCH_SUCCESS: 1,
  FETCH_FAILURE: 2,
};

interface GetCustomersState {
  isLoading: boolean;
  isError: boolean;
  customers: Customer[];
}

export const useGetCustomers = (stale: { stale: boolean }) => {
  const reducer = (state: GetCustomersState, action: any) => {
    switch (action.type) {
      case FetchState.FETCH_INIT:
        return { ...state, isLoading: true, isError: false };
      case FetchState.FETCH_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isError: false,
          customers: action.payload as Customer[],
        };
      case FetchState.FETCH_FAILURE:
        return { ...state, isLoading: false, isError: true };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    isError: false,
    customers: [],
  });

  useEffect(() => {
    let didCancel = false;
    const getCustomers = async () => {
      dispatch({ type: FetchState.FETCH_INIT });
      try {
        const data = await customerApi.getCustomers();
        if (!didCancel) {
          dispatch({ type: FetchState.FETCH_SUCCESS, payload: data.documents });
        }
      } catch (e) {
        if (!didCancel) {
          dispatch({ type: FetchState.FETCH_FAILURE });
        }
      }
    };
    getCustomers();
    return () => {
      didCancel = true;
    };
  }, [stale]);

  return state;
};

interface GetCustomerState {
  isLoading: boolean;
  isError: boolean;
  customer: any;
}

export const useGetCustomer = (id?: string) => {
  const reducer = (state: GetCustomerState, action: any) => {
    switch (action.type) {
      case FetchState.FETCH_INIT:
        return { ...state, isLoading: true, isError: false };
      case FetchState.FETCH_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isError: false,
          customer: action.payload as Customer,
        };
      case FetchState.FETCH_FAILURE:
        return { ...state, isLoading: false, isError: true };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    isError: false,
    customer: null,
  });

  useEffect(() => {
    let didCancel = false;
    const getCustomer = async (id: string) => {
      dispatch({ type: FetchState.FETCH_INIT });
      try {
        const data = await customerApi.getCustomer(id);
        if (!didCancel) {
          dispatch({
            type: FetchState.FETCH_SUCCESS,
            payload: {
              ...data,
              dateOfBirth: formatDate(new Date(data.dateOfBirth), 'mm/dd/yyyy'),
            },
          });
        }
      } catch (e) {
        if (!didCancel) {
          dispatch({ type: FetchState.FETCH_FAILURE });
        }
      }
    };
    if (id) {
      getCustomer(id);
    }
    return () => {
      didCancel = true;
    };
  }, [id]);

  return state;
};

export interface GetUserState {
  isLoading: boolean;
  isError: boolean;
  user: any;
}

export const useGetUser = () => {
  const reducer = (state: GetUserState, action: any) => {
    switch (action.type) {
      case FetchState.FETCH_INIT:
        return { ...state, isLoading: true, isError: false };
      case FetchState.FETCH_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isError: false,
          user: action.payload,
        };
      case FetchState.FETCH_FAILURE:
        return { ...state, isLoading: false, isError: true };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    isError: false,
    user: null,
  });

  useEffect(() => {
    let didCancel = false;
    const getUser = async () => {
      dispatch({ type: FetchState.FETCH_INIT });
      try {
        const account = await api.getAccount();
        if (!didCancel) {
          dispatch({ type: FetchState.FETCH_SUCCESS, payload: account });
        }
      } catch (e) {
        if (!didCancel) {
          dispatch({ type: FetchState.FETCH_FAILURE });
        }
      }
    };
    getUser();
    return () => {
      didCancel = true;
    };
  }, []);

  return state;
};
