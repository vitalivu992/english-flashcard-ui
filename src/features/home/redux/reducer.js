import initialState from './initialState';
import { reducer as fetchCardReducer } from './fetchCard';
import { reducer as flipCardReducer } from './flipCard';
import { reducer as nextExampleReducer } from './nextExample';
import { reducer as nextMeaningReducer } from './nextMeaning';
import { reducer as fetchWordByIdReducer } from './fetchWordById';
import { reducer as fetchWordsReducer } from './fetchWords';

const reducers = [
  fetchCardReducer,
  flipCardReducer,
  nextExampleReducer,
  nextMeaningReducer,
  fetchWordByIdReducer,
  fetchWordsReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  /* istanbul ignore next */
  return reducers.reduce((s, r) => r(s, action), newState);
}
