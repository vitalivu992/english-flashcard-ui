import {
  HOME_FLIP_CARD,
} from '../../../../src/features/home/redux/constants';

import {
  flipCard,
  reducer,
} from '../../../../src/features/home/redux/flipCard';

describe('home/redux/flipCard', () => {
  it('returns correct action by flipCard', () => {
    expect(flipCard()).toHaveProperty('type', HOME_FLIP_CARD);
  });

  it('handles action type HOME_FLIP_CARD correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_FLIP_CARD }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
