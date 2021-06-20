import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  HOME_FETCH_WORDS_BEGIN,
  HOME_FETCH_WORDS_SUCCESS,
  HOME_FETCH_WORDS_FAILURE,
  HOME_FETCH_WORDS_DISMISS_ERROR,
  USER_SESSION_LENGTH,
  USER_HASH,
} from './constants';

export function fetchWords(day, args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: HOME_FETCH_WORDS_BEGIN,
    });

    let length = sessionStorage.getItem(USER_SESSION_LENGTH);
    let userHash = sessionStorage.getItem(USER_HASH);
    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.get(process.env.REACT_APP_FLASHCARD_API + '/api/v1/words?src=flashcard'
        + (day ? '&day=' + day : '')
        + (length ? '&days=' + length : '')
        + '&offset=' + (userHash ? userHash : 0));
      doRequest.then(
        (res) => {
          dispatch({
            type: HOME_FETCH_WORDS_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: HOME_FETCH_WORDS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchWordsError() {
  return {
    type: HOME_FETCH_WORDS_DISMISS_ERROR,
  };
}

export function useFetchWords() {
  const dispatch = useDispatch();

  const { fetchWordsPending, fetchWordsError } = useSelector(
    state => ({
      fetchWordsPending: state.home.fetchWordsPending,
      fetchWordsError: state.home.fetchWordsError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchWords(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchWordsError());
  }, [dispatch]);

  return {
    fetchWords: boundAction,
    fetchWordsPending,
    fetchWordsError,
    dismissFetchWordsError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_FETCH_WORDS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchWordsPending: true,
        fetchWordsError: null,
      };

    case HOME_FETCH_WORDS_SUCCESS:
      // The request is success
      return {
        ...state,
        words: action.data.data,
        fetchWordsPending: false,
        fetchWordsError: null,
      };

    case HOME_FETCH_WORDS_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchWordsPending: false,
        fetchWordsError: action.data.error,
      };

    case HOME_FETCH_WORDS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchWordsError: null,
      };

    default:
      return state;
  }
}
