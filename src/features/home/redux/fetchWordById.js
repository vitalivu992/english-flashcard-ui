import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  HOME_FETCH_WORD_BY_ID_BEGIN,
  HOME_FETCH_WORD_BY_ID_SUCCESS,
  HOME_FETCH_WORD_BY_ID_FAILURE,
  HOME_FETCH_WORD_BY_ID_DISMISS_ERROR,
} from './constants';

export function fetchWordById(cardId, args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: HOME_FETCH_WORD_BY_ID_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.get(process.env.REACT_APP_FLASHCARD_API+'/api/v1/words/'+cardId)
      doRequest.then(
        (res) => {
          dispatch({
            type: HOME_FETCH_WORD_BY_ID_SUCCESS,
            data: res.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: HOME_FETCH_WORD_BY_ID_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchWordByIdError() {
  return {
    type: HOME_FETCH_WORD_BY_ID_DISMISS_ERROR,
  };
}

export function useFetchWordById() {
  const dispatch = useDispatch();

  const { fetchWordByIdPending, fetchWordByIdError } = useSelector(
    state => ({
      fetchWordByIdPending: state.home.fetchWordByIdPending,
      fetchWordByIdError: state.home.fetchWordByIdError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchWordById(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchWordByIdError());
  }, [dispatch]);

  return {
    fetchWordById: boundAction,
    fetchWordByIdPending,
    fetchWordByIdError,
    dismissFetchWordByIdError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_FETCH_WORD_BY_ID_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchWordByIdPending: true,
        fetchWordByIdError: null,
      };

    case HOME_FETCH_WORD_BY_ID_SUCCESS:
      // The request is success
      return {
        ...state,
        word: action.data.data,
        fetchWordByIdPending: false,
        fetchWordByIdError: null,
      };

    case HOME_FETCH_WORD_BY_ID_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchWordByIdPending: false,
        fetchWordByIdError: action.data.error,
      };

    case HOME_FETCH_WORD_BY_ID_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchWordByIdError: null,
      };

    default:
      return state;
  }
}
