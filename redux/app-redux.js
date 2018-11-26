import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import * as firebase from "firebase";
import { db } from "../firebase/firebaseConfig";

//-----------------------
// Initial State
//

const initialState = {
  userData: {},
  activities: {},
  places: {}
};

// -----------------------
// Action Types
//

const GET_USER_DATA = "GET_USER_DATA";
const GET_ACTIVITY_DATA = "GET_ACTIVITY_DATA";
const GET_PLACE_DATA = "GET_PLACE_DATA";

// -----------------------
// Action Creators
//

export const getUserData = userData => {
  return {
    type: GET_USER_DATA,
    value: userData
  };
};

export const getActivityData = activityData => {
  return {
    type: GET_ACTIVITY_DATA,
    value: activityData
  };
};

export const getPlaceData = placeData => {
  return {
    type: GET_PLACE_DATA,
    value: placeData
  };
};

// -----------------------
// Thunk
//

// get userData
export const watchUserData = () => {
  return async function(dispatch) {
    const userId = firebase.auth().currentUser.uid;

    await db.ref("/users/" + userId).on(
      "value",
      function(snapshot) {
        const userData = snapshot.val();
        // console.log("THIS IS SNAPSHOT\n\n\n\n\n\n");
        // console.log(snapshot);
        dispatch(getUserData(userData));
      },
      function(error) {
        console.log(error);
      }
    );
  };
};
// get activityData
export const watchActivityData = () => {
  return async function(dispatch) {
    await db.ref("activities").on(
      "value",
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
// get placeData
export const watchPlaceData = () => {
  return async function(dispatch) {
    await db.ref("places").on(
      "value",
      function(snapshot) {
        let placeData = snapshot.val();
        var actionGetPlaceData = getPlaceData(placeData);
        dispatch(actionGetPlaceData);
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
  // console.log("INSIDE THE REDUCER");
  switch (action.type) {
    case GET_USER_DATA:
      // console.log("INSIDE GET_USER_DATA CASE");
      // console.log(action);
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
