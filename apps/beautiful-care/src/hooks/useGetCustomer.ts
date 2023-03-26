import { formatDate } from '@beautiful-care/ui-component';
import { Query } from 'appwrite';
import { useEffect, useReducer } from 'react';
import { FetchState } from '.';
import { Customer, customerApi } from '../apis/customer.api';

interface GetCustomersState {
  isLoading: boolean;
  isError: boolean;
  customers: Customer[];
  total: 0;
}

export const useGetCustomers = (page: number, limit: number, phone: string) => {
  const reducer = (state: GetCustomersState, action: any) => {
    switch (action.type) {
      case FetchState.FETCH_INIT:
        return { ...state, isLoading: true, isError: false };
      case FetchState.FETCH_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isError: false,
          customers: action.payload.customers as Customer[],
          total: action.payload.total,
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
    total: 0,
  });

  useEffect(() => {
    let didCancel = false;
    const getCustomers = async () => {
      dispatch({ type: FetchState.FETCH_INIT });
      try {
        const data = await customerApi.getCustomers(
          phone
            ? [
                Query.limit(limit),
                Query.offset((page - 1) * limit),
                Query.search('phone', phone),
              ]
            : [Query.limit(limit), Query.offset((page - 1) * limit)]
        );
        if (!didCancel) {
          dispatch({
            type: FetchState.FETCH_SUCCESS,
            payload: { customers: data.documents, total: data.total },
          });
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
  }, [page, limit, phone]);

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
              dateOfBirth: data.dateOfBirth
                ? formatDate(new Date(data.dateOfBirth))
                : '',
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
