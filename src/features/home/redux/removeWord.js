import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  HOME_REMOVE_WORD,
} from './constants';

export function removeWord(word) {
  return {
    type: HOME_REMOVE_WORD,
    data: word,
  };
}

export function useRemoveWord() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(removeWord(...params)), [dispatch]);
  return { removeWord: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_REMOVE_WORD:
      return {
        ...state,
        words: state.words.filter(w => w.word !== action.data)
      };

    default:
      return state;
  }
}
