import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_FETCH_WORD_BY_ID_BEGIN,
  HOME_FETCH_WORD_BY_ID_SUCCESS,
  HOME_FETCH_WORD_BY_ID_FAILURE,
  HOME_FETCH_WORD_BY_ID_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  fetchWordById,
  dismissFetchWordByIdError,
  reducer,
} from '../../../../src/features/home/redux/fetchWordById';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/fetchWordById', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when fetchWordById succeeds', () => {
    const store = mockStore({});

    return store.dispatch(fetchWordById())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_FETCH_WORD_BY_ID_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_FETCH_WORD_BY_ID_SUCCESS);
      });
  });

  it('dispatches failure action when fetchWordById fails', () => {
    const store = mockStore({});

    return store.dispatch(fetchWordById({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_FETCH_WORD_BY_ID_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_FETCH_WORD_BY_ID_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFetchWordByIdError', () => {
    const expectedAction = {
      type: HOME_FETCH_WORD_BY_ID_DISMISS_ERROR,
    };
    expect(dismissFetchWordByIdError()).toEqual(expectedAction);
  });

  it('handles action type HOME_FETCH_WORD_BY_ID_BEGIN correctly', () => {
    const prevState = { fetchWordByIdPending: false };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_WORD_BY_ID_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchWordByIdPending).toBe(true);
  });

  it('handles action type HOME_FETCH_WORD_BY_ID_SUCCESS correctly', () => {
    const prevState = { fetchWordByIdPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_WORD_BY_ID_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchWordByIdPending).toBe(false);
  });

  it('handles action type HOME_FETCH_WORD_BY_ID_FAILURE correctly', () => {
    const prevState = { fetchWordByIdPending: true };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_WORD_BY_ID_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchWordByIdPending).toBe(false);
    expect(state.fetchWordByIdError).toEqual(expect.anything());
  });

  it('handles action type HOME_FETCH_WORD_BY_ID_DISMISS_ERROR correctly', () => {
    const prevState = { fetchWordByIdError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_FETCH_WORD_BY_ID_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.fetchWordByIdError).toBe(null);
  });
});

