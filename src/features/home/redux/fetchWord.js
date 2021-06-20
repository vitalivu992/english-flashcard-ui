import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  HOME_FETCH_WORD_BEGIN,
  HOME_FETCH_WORD_SUCCESS,
  HOME_FETCH_WORD_FAILURE,
  HOME_FETCH_WORD_DISMISS_ERROR,
} from './constants';

export function fetchWord(word, args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: HOME_FETCH_WORD_BEGIN,
    });
    if (word) { } else {
      return Promise.reject();
    }
    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.get(process.env.REACT_APP_FLASHCARD_API + '/api/v1/words?src=flashcard&word=' + word);
      doRequest.then(
        (res) => {
          dispatch({
            type: HOME_FETCH_WORD_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: HOME_FETCH_WORD_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchWordError() {
  return {
    type: HOME_FETCH_WORD_DISMISS_ERROR,
  };
}

export function useFetchWord() {
  const dispatch = useDispatch();

  const { fetchWordPending, fetchWordError } = useSelector(
    state => ({
      fetchWordPending: state.home.fetchWordPending,
      fetchWordError: state.home.fetchWordError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchWord(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchWordError());
  }, [dispatch]);

  return {
    fetchWord: boundAction,
    fetchWordPending,
    fetchWordError,
    dismissFetchWordError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_FETCH_WORD_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchWordPending: true,
        fetchWordError: null,
      };

    case HOME_FETCH_WORD_SUCCESS:
      // The request is success
      return {
        ...state,
        fetchWordPending: false,
        fetchWordError: null,
        word: action.data.data,
        words: []
      };

    case HOME_FETCH_WORD_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchWordPending: false,
        fetchWordError: action.data.error,
      };

    case HOME_FETCH_WORD_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchWordError: null,
      };

    default:
      return state;
  }
}
