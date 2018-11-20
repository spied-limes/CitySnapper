import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as firebase from 'firebase';
import { db } from '../firebase/firebaseConfig';

//-----------------------
// Initial State
//

const initialState = {
  userData: {},
  activities: [],
};

// -----------------------
// Action Types
//

const GET_USER_DATA = 'GET_USER_DATA';
const GET_ACTIVITY_DATA = 'GET_ACTIVITY_DATA';

// -----------------------
// Action Creators
//

export const getUserData = userData => {
  return {
    type: GET_USER_DATA,
    value: userData,
  };
};

export const getActivityData = activityData => {
  return {
    type: GET_ACTIVITY_DATA,
    value: activityData,
  };
};

// -----------------------
// Thunk
//

// get userData
export const watchUserData = () => {
  return async function(dispatch) {
    const userId = firebase.auth().currentUser.uid;

    await db.ref('/users/' + userId).on(
      'value',
      function(snapshot) {
        var userData = snapshot.val();
        var actionGetUserData = getUserData(userData);
        dispatch(actionGetUserData);
      },
      function(error) {
        console.log(error);
      }
    );
  };
};

export const watchActivityData = () => {
  return async function(dispatch) {
    await db.ref('activities').on(
      'value',
      function(snapshot) {
        var activityData = snapshot.val();
        var actionGetActivityData = getActivityData(activityData);
        dispatch(actionGetActivityData);
      },
      function(error) {
        console.log(error);
      }
    );
  };
};

// Write to firebase example:
// firebase
//   .database()
//   .ref(`/voting-app/users/${userID}/newPoll`)
//   .set(newPoll)
//   .then(() => {
//     console.log('New poll data sent!');
//   })
//   .catch(error => console.log('Error when creating new poll.', error));

//------------------------
// Reducer
//

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DATA:
      return { ...state, userData: action.value };
    case GET_ACTIVITY_DATA:
      return { ...state, activities: action.value };
    default:
      return state;
  }
};

//------------------------
// Store
//

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export { store };
