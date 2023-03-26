import { useEffect, useReducer } from 'react';
import { api } from '../apis/api';

export const FetchState = {
  FETCH_INIT: 0,
  FETCH_SUCCESS: 1,
  FETCH_FAILURE: 2,
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
