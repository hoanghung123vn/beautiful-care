import { Query } from 'appwrite';
import { useEffect, useReducer } from 'react';
import { FetchState } from '.';
import { Combo, comboApi } from '../apis/combo.api';

interface GetCombosState {
  isLoading: boolean;
  isError: boolean;
  combos: Combo[];
  total: 0;
}

export const useGetCombos = (page: number, limit: number, name: string) => {
  const reducer = (state: GetCombosState, action: any) => {
    switch (action.type) {
      case FetchState.FETCH_INIT:
        return { ...state, isLoading: true, isError: false };
      case FetchState.FETCH_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isError: false,
          combos: action.payload.combos as Combo[],
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
    combos: [],
    total: 0,
  });

  useEffect(() => {
    let didCancel = false;
    const getCombos = async () => {
      dispatch({ type: FetchState.FETCH_INIT });
      try {
        const data = await comboApi.getCombos(
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
            payload: { combos: data.documents, total: data.total },
          });
        }
      } catch (e) {
        if (!didCancel) {
          dispatch({ type: FetchState.FETCH_FAILURE });
        }
      }
    };
    getCombos();
    return () => {
      didCancel = true;
    };
  }, [page, limit, name]);

  return state;
};

interface GetComboState {
  isLoading: boolean;
  isError: boolean;
  combo: any;
}

export const useGetCombo = (id?: string) => {
  const reducer = (state: GetComboState, action: any) => {
    switch (action.type) {
      case FetchState.FETCH_INIT:
        return { ...state, isLoading: true, isError: false };
      case FetchState.FETCH_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isError: false,
          combo: action.payload as Combo,
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
    combo: null,
  });

  useEffect(() => {
    let didCancel = false;
    const getCombo = async (id: string) => {
      dispatch({ type: FetchState.FETCH_INIT });
      try {
        const data = await comboApi.getCombo(id);
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
      getCombo(id);
    }
    return () => {
      didCancel = true;
    };
  }, [id]);

  return state;
};
