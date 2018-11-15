import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

//
// Initial State
//

const initialState = {
  dummyData: 'dummyInfo',
};

//
// Reducer
//

const reducer = (state = initialState, action) => {};

//
// Store
//

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export { store };
