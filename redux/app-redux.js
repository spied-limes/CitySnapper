import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as firebase from 'firebase';
import { db } from '../firebase/firebaseConfig';

//-----------------------
// Initial State
//

const initialState = {
  userData: {},
  activities: {},
  places: {},
};

// -----------------------
// Action Types
//

const GET_USER_DATA = 'GET_USER_DATA';
const GET_ACTIVITY_DATA = 'GET_ACTIVITY_DATA';
const GET_PLACE_DATA = 'GET_PLACE_DATA';

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

export const getPlaceData = placeData => {
  return {
    type: GET_PLACE_DATA,
    value: placeData,
  };
};

// -----------------------
// Thunk
//

// get userData
export const watchUserData = () => {
  return async function(dispatch) {
    console.log('firebase.auth().currentUser: ', firebase.auth().currentUser);
    const userId = firebase.auth().currentUser
      ? firebase.auth().currentUser.uid
      : undefined;

    await db.ref('users/' + userId).on(
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
// get activity data
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
// get places data
export const watchPlaceData = () => {
  return async function(dispatch) {
    await db.ref('places').on(
      'value',
      function(snapshot) {
        var placeData = snapshot.val();
        var actionGetPlaceData = getPlaceData(placeData);
        dispatch(actionGetPlaceData);
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
    case GET_PLACE_DATA:
      return { ...state, places: action.value };
    default:
      return state;
  }
};

//------------------------
// Store
//

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export { store };
