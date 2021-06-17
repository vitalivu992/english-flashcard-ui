import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_FETCH_CARD_BEGIN,
  HOME_FETCH_CARD_SUCCESS,
  HOME_FETCH_CARD_FAILURE,
  HOME_FETCH_CARD_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  fetchCard,
  dismissFetchCardError,
  reducer,
} from '../../../../src/features/home/redux/fetchCard';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/fetchCard', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchCard succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchCard())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_FETCH_CARD_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_FETCH_CARD_SUCCESS);
      });
  });

  it('dispatches failure action when fetchCard fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchCard({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_FETCH_CARD_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_FETCH_CARD_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchCardError', () => {
    const expectedAction = {
      type: HOME_FETCH_CARD_DISMISS_ERROR,
    };
    expect(dismissFetchCardError()).toEqual(expectedAction);
  });

  it('handles action type HOME_FETCH_CARD_BEGIN correctly', () => {
    const prevState = { fetchCardPending: false };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_CARD_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchCardPending).toBe(true);
  });

  it('handles action type HOME_FETCH_CARD_SUCCESS correctly', () => {
    const prevState = { fetchCardPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_CARD_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchCardPending).toBe(false);
  });

  it('handles action type HOME_FETCH_CARD_FAILURE correctly', () => {
    const prevState = { fetchCardPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_CARD_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchCardPending).toBe(false);
    expect(state.fetchCardError).toEqual(expect.anything());
  });

  it('handles action type HOME_FETCH_CARD_DISMISS_ERROR correctly', () => {
    const prevState = { fetchCardError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_CARD_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchCardError).toBe(null);
  });
});

