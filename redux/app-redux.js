import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as firebase from 'firebase';

//-----------------------
// Initial State
//

const initialState = {
  dummyData: 'dummyInfo',
  userData: {},
};

// -----------------------
// Action Types
//

const SET_DUMMY_DATA = 'SET_DUMMY_DATA';
const SET_USER_DATA = 'SET_USER_DATA';

// -----------------------
// Action Creators
//

export const setDummyData = dummyData => {
  return {
    type: SET_DUMMY_DATA,
    value: dummyData,
  };
};

export const setUserData = userData => {
  return {
    type: SET_USER_DATA,
    value: userData,
  };
};

// -----------------------
// Thunk
//

export const watchUserData = () => {
  return async function(dispatch) {
    await firebase
      .database()
      .ref('users')
      .on(
        'value',
        function(snapshot) {
          var userData = snapshot.val();
          var actionSetUserData = setUserData(userData);
          dispatch(actionSetUserData);
        },
        function(error) {
          console.log(error);
        }
      );
  };
};

//------------------------
// Reducer
//

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DUMMY_DATA:
      return { ...state, dummyData: action.value };
    case SET_USER_DATA:
      return { ...state, userData: action.value };
    default:
      return state;
  }
};

//------------------------
// Store
//

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export { store };
