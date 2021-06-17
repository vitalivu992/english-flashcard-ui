import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  HOME_NEXT_MEANING,
} from './constants';

export function nextMeaning() {
  return {
    type: HOME_NEXT_MEANING,
  };
}

export function useNextMeaning() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(nextMeaning(...params)), [dispatch]);
  return { nextMeaning: boundAction };
}

export function reducer(state, action) {
  const { meanings } = state.flashCard;
  let meaning = null, example = null, examples = [], gram = null;
  if (meanings && meanings.length > 0) {
    let mean = meanings[Math.floor(Math.random(1) * meanings.length)];
    meaning = mean.mean;
    if (mean.example && mean.example.length > 0) {
      examples = mean.example;
      example = examples[Math.floor(Math.random(1) * examples.length)];
    }
    if (mean.gram) {
      gram = mean.gram;
    }
    console.log('word all meanings', meanings)
    console.log('word meaning', meaning)
    console.log('word example', example)
    console.log('word gram', gram)
  }

  switch (action.type) {
    case HOME_NEXT_MEANING:
      return {
        ...state,
        selectedExamples: examples,
        selectedExample: example,
        selectedMeaning: meaning,
        meaningGram: gram,
      };

    default:
      return state;
  }
}
