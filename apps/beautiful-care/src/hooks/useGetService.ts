import { Query } from 'appwrite';
import { useEffect, useReducer } from 'react';
import { FetchState } from '.';
import { Service, serviceApi } from '../apis/service.api';

interface GetServicesState {
  isLoading: boolean;
  isError: boolean;
  services: Service[];
  total: 0;
}

export const useGetServices = (page: number, limit: number, name: string) => {
  const reducer = (state: GetServicesState, action: any) => {
    switch (action.type) {
      case FetchState.FETCH_INIT:
        return { ...state, isLoading: true, isError: false };
      case FetchState.FETCH_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isError: false,
          services: action.payload.services as Service[],
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
    services: [],
    total: 0,
  });

  useEffect(() => {
    let didCancel = false;
    const getServices = async () => {
      dispatch({ type: FetchState.FETCH_INIT });
      try {
        const data = await serviceApi.getServices(
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
            payload: { services: data.documents, total: data.total },
          });
        }
      } catch (e) {
        if (!didCancel) {
          dispatch({ type: FetchState.FETCH_FAILURE });
        }
      }
    };
    getServices();
    return () => {
      didCancel = true;
    };
  }, [page, limit, name]);

  return state;
};

interface GetServiceState {
  isLoading: boolean;
  isError: boolean;
  service: any;
}

export const useGetService = (id?: string) => {
  const reducer = (state: GetServiceState, action: any) => {
    switch (action.type) {
      case FetchState.FETCH_INIT:
        return { ...state, isLoading: true, isError: false };
      case FetchState.FETCH_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isError: false,
          service: action.payload as Service,
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
    service: null,
  });

  useEffect(() => {
    let didCancel = false;
    const getService = async (id: string) => {
      dispatch({ type: FetchState.FETCH_INIT });
      try {
        const data = await serviceApi.getService(id);
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
      getService(id);
    }
    return () => {
      didCancel = true;
    };
  }, [id]);

  return state;
};
