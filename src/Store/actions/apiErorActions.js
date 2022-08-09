import { SHOW_API_ERROR, HIDE_API_ERROR } from '../actionTypes';

export const showApiError = (message) => ({
  type: SHOW_API_ERROR,
  data: message
});

export const hideApiError = () => ({
  type: HIDE_API_ERROR
});
