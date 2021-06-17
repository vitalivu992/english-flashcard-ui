import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  HOME_NEXT_EXAMPLE,
} from './constants';

export function nextExample() {
  return {
    type: HOME_NEXT_EXAMPLE,
  };
}

export function useNextExample() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(nextExample(...params)), [dispatch]);
  return { nextExample: boundAction };
}

export function reducer(state, action) {
  let example = state.selectedExamples.length > 0 ?
    state.selectedExamples[Math.floor(Math.random() * state.selectedExamples.length)] : null;
  switch (action.type) {
    case HOME_NEXT_EXAMPLE:
      return {
        ...state,
        selectedExample: example,
      };

    default:
      return state;
  }
}
