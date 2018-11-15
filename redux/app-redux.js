import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

//-----------------------
// Initial State
//

const initialState = {
  dummyData: 'dummyInfo',
};

// -----------------------
// Action Types
//

const SET_DUMMY_DATA = 'SET_DUMMY_DATA';

// -----------------------
// Action Creators
//

export const setDummyData = dummyData => {
  return {
    type: SET_DUMMY_DATA,
    value: dummyData,
  };
};

// -----------------------
// Thunk
//

//------------------------
// Reducer
//

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DUMMY_DATA:
      return { ...state, dummyData: action.value };
    default:
      return state;
  }
};

//------------------------
// Store
//

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export { store };
