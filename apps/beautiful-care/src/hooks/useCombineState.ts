import { useReducer } from 'react';

export function useCombineState<T>(
  initCombineState: T
): [T, React.Dispatch<Partial<T>>] {
  const [combineState, setCombineState] = useReducer(
    (prev: T, next: Partial<T>): T => {
      return { ...prev, ...next };
    },
    initCombineState
  );

  return [combineState, setCombineState];
}
