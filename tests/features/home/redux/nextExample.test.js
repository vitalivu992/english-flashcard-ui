import {
  HOME_NEXT_EXAMPLE,
} from '../../../../src/features/home/redux/constants';

import {
  nextExample,
  reducer,
} from '../../../../src/features/home/redux/nextExample';

describe('home/redux/nextExample', () => {
  it('returns correct action by nextExample', () => {
    expect(nextExample()).toHaveProperty('type', HOME_NEXT_EXAMPLE);
  });

  it('handles action type HOME_NEXT_EXAMPLE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_NEXT_EXAMPLE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
