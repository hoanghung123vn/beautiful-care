import { Query } from 'appwrite';
import { useEffect, useReducer } from 'react';
import { FetchState } from '.';
import { Order, orderApi } from '../apis/order.api';

interface GetOrdersState {
  isLoading: boolean;
  isError: boolean;
  orders: Order[];
  total: 0;
}

export const useGetOrders = (page: number, limit: number, name: string) => {
  const reducer = (state: GetOrdersState, action: any) => {
    switch (action.type) {
      case FetchState.FETCH_INIT:
        return { ...state, isLoading: true, isError: false };
      case FetchState.FETCH_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isError: false,
          orders: action.payload.orders as Order[],
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
    orders: [],
    total: 0,
  });

  useEffect(() => {
    let didCancel = false;
    const getOrders = async () => {
      dispatch({ type: FetchState.FETCH_INIT });
      try {
        const data = await orderApi.getOrders(
          name
            ? [
                Query.limit(limit),
                Query.offset((page - 1) * limit),
                Query.search('name', name),
              ]
            : [Query.limit(limit), Query.offset((page - 1) * limit)]
        );
        if (!didCancel) {
          dispatch({
            type: FetchState.FETCH_SUCCESS,
            payload: { orders: data.documents, total: data.total },
          });
        }
      } catch (e) {
        if (!didCancel) {
          dispatch({ type: FetchState.FETCH_FAILURE });
        }
      }
    };
    getOrders();
    return () => {
      didCancel = true;
    };
  }, [page, limit, name]);

  return state;
};

interface GetOrderState {
  isLoading: boolean;
  isError: boolean;
  order: any;
}

export const useGetOrder = (id?: string) => {
  const reducer = (state: GetOrderState, action: any) => {
    switch (action.type) {
      case FetchState.FETCH_INIT:
        return { ...state, isLoading: true, isError: false };
      case FetchState.FETCH_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isError: false,
          order: action.payload as Order,
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
    order: null,
  });

  useEffect(() => {
    let didCancel = false;
    const getOrder = async (id: string) => {
      dispatch({ type: FetchState.FETCH_INIT });
      try {
        const data = await orderApi.getOrder(id);
        if (!didCancel) {
          dispatch({
            type: FetchState.FETCH_SUCCESS,
            payload: data,
          });
        }
      } catch (e) {
        if (!didCancel) {
          dispatch({ type: FetchState.FETCH_FAILURE });
        }
      }
    };
    if (id) {
      getOrder(id);
    }
    return () => {
      didCancel = true;
    };
  }, [id]);

  return state;
};
