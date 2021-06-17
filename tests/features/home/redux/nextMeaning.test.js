import {
  HOME_NEXT_MEANING,
} from '../../../../src/features/home/redux/constants';

import {
  nextMeaning,
  reducer,
} from '../../../../src/features/home/redux/nextMeaning';

describe('home/redux/nextMeaning', () => {
  it('returns correct action by nextMeaning', () => {
    expect(nextMeaning()).toHaveProperty('type', HOME_NEXT_MEANING);
  });

  it('handles action type HOME_NEXT_MEANING correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_NEXT_MEANING }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
