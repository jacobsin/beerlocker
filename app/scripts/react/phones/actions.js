/*eslint-disable import/default*/
import * as t from './actionTypes';
import fetch from 'isomorphic-fetch';

export const search = (text) => ({
  type: t.SEARCH,
  payload: { text }
});

export const fetchAll = () => ({
  type: t.FETCH,
  payload: {
    promise: fetch('api/static/phones/phones.json')
      .then(response => response.json())
  }
});
