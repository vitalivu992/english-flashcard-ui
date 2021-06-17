import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  HOME_FETCH_CARD_BEGIN,
  HOME_FETCH_CARD_SUCCESS,
  HOME_FETCH_CARD_FAILURE,
  HOME_FETCH_CARD_DISMISS_ERROR,
  HOME_NEXT_MEANING,
} from './constants';

export function fetchCard(day, days, args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: HOME_FETCH_CARD_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = axios.get(process.env.REACT_APP_FLASHCARD_API + '/api/v2/flashcard?limit=1'
        + (day ? '&day=' + day : '')
        + (days ? '&days=' + days : ''))
      doRequest.then(
        (res) => {
          dispatch({
            type: HOME_FETCH_CARD_SUCCESS,
            data: res.data,
          });
          dispatch({
            type: HOME_NEXT_MEANING,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: HOME_FETCH_CARD_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchCardError() {
  return {
    type: HOME_FETCH_CARD_DISMISS_ERROR,
  };
}

export function useFetchCard(params) {
  const dispatch = useDispatch();

  const { fetchCardPending, fetchCardError } = useSelector(
    state => ({
      fetchCardPending: state.home.fetchCardPending,
      fetchCardError: state.home.fetchCardError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchCard(...args));
  }, [dispatch]);

  useEffect(() => {
    if (params) boundAction(...(params || []));
  }, [...(params || []), boundAction]); // eslint-disable-line

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchCardError());
  }, [dispatch]);

  return {
    fetchCard: boundAction,
    fetchCardPending,
    fetchCardError,
    dismissFetchCardError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_FETCH_CARD_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchCardPending: true,
        fetchCardError: null,
      };

    case HOME_FETCH_CARD_SUCCESS:
      // The request is success
      return {
        ...state,
        fetchCardPending: false,
        fetchCardError: null,
        flashCard: action.data.data,
      };

    case HOME_FETCH_CARD_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchCardPending: false,
        fetchCardError: action.data.error,
      };

    case HOME_FETCH_CARD_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchCardError: null,
      };

    default:
      return state;
  }
}
