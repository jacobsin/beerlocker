/*eslint-disable import/default*/

import * as t from './actionTypes';
import 'whatwg-fetch';
import {checkStatus, parseJSON} from './helpers/responseHandlers';

export const search = (searchText, sortOrder) => ({
  type: t.SEARCH,
  searchText,
  sortOrder
});

export const selectImage = (imageUrl) => ({
  type: t.SELECT_IMAGE,
  imageUrl
});

export const fetchOne = (id) => ({
  type: t.FETCH,
  payload: {
    promise: fetch(`api/static/phones/${id}.json`)
      .then(checkStatus)
      .then(parseJSON)
  }
});

export const fetchAll = () => ({
  type: t.FETCH_ALL,
  payload: {
    promise: fetch('api/static/phones/phones.json')
      .then(checkStatus)
      .then(parseJSON)
  }
});
