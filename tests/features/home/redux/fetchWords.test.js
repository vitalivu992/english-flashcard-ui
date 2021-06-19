import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_FETCH_WORDS_BEGIN,
  HOME_FETCH_WORDS_SUCCESS,
  HOME_FETCH_WORDS_FAILURE,
  HOME_FETCH_WORDS_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  fetchWords,
  dismissFetchWordsError,
  reducer,
} from '../../../../src/features/home/redux/fetchWords';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/fetchWords', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchWords succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchWords())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_FETCH_WORDS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_FETCH_WORDS_SUCCESS);
      });
  });

  it('dispatches failure action when fetchWords fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchWords({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_FETCH_WORDS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_FETCH_WORDS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchWordsError', () => {
    const expectedAction = {
      type: HOME_FETCH_WORDS_DISMISS_ERROR,
    };
    expect(dismissFetchWordsError()).toEqual(expectedAction);
  });

  it('handles action type HOME_FETCH_WORDS_BEGIN correctly', () => {
    const prevState = { fetchWordsPending: false };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_WORDS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchWordsPending).toBe(true);
  });

  it('handles action type HOME_FETCH_WORDS_SUCCESS correctly', () => {
    const prevState = { fetchWordsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_WORDS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchWordsPending).toBe(false);
  });

  it('handles action type HOME_FETCH_WORDS_FAILURE correctly', () => {
    const prevState = { fetchWordsPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_WORDS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchWordsPending).toBe(false);
    expect(state.fetchWordsError).toEqual(expect.anything());
  });

  it('handles action type HOME_FETCH_WORDS_DISMISS_ERROR correctly', () => {
    const prevState = { fetchWordsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_WORDS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchWordsError).toBe(null);
  });
});

