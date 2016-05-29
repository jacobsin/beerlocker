import * as t from './actionTypes';

const initialState = {
  isFetching: false,
  items: [],
  detail: null,
  error: null,
  searchText: '',
  sortOrder: 'age'
};

export default function phonesAppState(state = initialState, action) {
  switch (action.type) {
    case `${t.FETCH_ALL}_PENDING`:
      return {
        ...state,
        isFetching: true,
        error: null
      };

    case `${t.FETCH_ALL}_FULFILLED`:
      return {
        ...state,
        isFetching: false,
        items: action.payload
      };

    case `${t.FETCH_ALL}_REJECTED`:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };

    case `${t.FETCH}_PENDING`:
      return {
        ...state,
        isFetching: true,
        error: null
      };

    case `${t.FETCH}_FULFILLED`:
      return {
        ...state,
        isFetching: false,
        detail: action.payload,
        mainImageUrl: action.payload.images[0]
      };

    case `${t.FETCH}_REJECTED`:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };

    case t.SELECT_IMAGE:
      return {
        ...state,
        mainImageUrl: action.imageUrl
      };

    case t.SEARCH:
      return {
        ...state,
        searchText: action.searchText,
        sortOrder: action.sortOrder
      };

    default:
      return state;
  }
}
