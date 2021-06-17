import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  HOME_FLIP_CARD,
} from './constants';

export function flipCard() {
  return {
    type: HOME_FLIP_CARD,
  };
}

export function useFlipCard() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(flipCard(...params)), [dispatch]);
  return { flipCard: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_FLIP_CARD:
      return {
        ...state,
        cardFlipped: !state.cardFlipped,
      };

    default:
      return state;
  }
}
