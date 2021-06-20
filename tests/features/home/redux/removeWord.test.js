import {
  HOME_REMOVE_WORD,
} from '../../../../src/features/home/redux/constants';

import {
  removeWord,
  reducer,
} from '../../../../src/features/home/redux/removeWord';

describe('home/redux/removeWord', () => {
  it('returns correct action by removeWord', () => {
    expect(removeWord()).toHaveProperty('type', HOME_REMOVE_WORD);
  });

  it('handles action type HOME_REMOVE_WORD correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_REMOVE_WORD }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
