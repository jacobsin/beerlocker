import * as t from './actionTypes';

const initialState = {
  isFetching: false,
  items: []
};

export default function phonesAppState(state = initialState, action) {
  switch (action.type) {
    case `${t.FETCH}_PENDING`:
      return {...state,
        isFetching: true
      };

    case `${t.FETCH}_FULFILLED`:
      return {...state,
        isFetching: false,
        items: action.payload
      };

    case `${t.FETCH}_REJECTED`:
      return {...state,
        isFetching: false,
        items: action.error
      };

    default:
      return state;
  }
}
