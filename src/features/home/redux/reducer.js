import initialState from './initialState';
import { reducer as fetchCardReducer } from './fetchCard';
import { reducer as flipCardReducer } from './flipCard';
import { reducer as nextExampleReducer } from './nextExample';
import { reducer as nextMeaningReducer } from './nextMeaning';
import { reducer as fetchWordByIdReducer } from './fetchWordById';
import { reducer as fetchWordsReducer } from './fetchWords';
import { reducer as removeWordReducer } from './removeWord';
import { reducer as fetchWordReducer } from './fetchWord';

const reducers = [
  fetchCardReducer,
  flipCardReducer,
  nextExampleReducer,
  nextMeaningReducer,
  fetchWordByIdReducer,
  fetchWordsReducer,
  removeWordReducer,
  fetchWordReducer,
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
