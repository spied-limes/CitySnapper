import * as firebase from 'firebase';
import { firebaseSecrets } from '../secrets';
// initialize firebase
const firebaseConfig = firebaseSecrets;

firebase.initializeApp(firebaseConfig);

export const db = firebase.database();

// Func to write a new UserId entry in /users when a new user signs up.
export function writeUserData(userId, userObj) {
  firebase
    .database()
    .ref('/users/' + userId)
    .set({
      username: userObj.username,
      firstName: userObj.firstName,
      lastName: userObj.lastName,
      email: userObj.email,
      streetAddress: userObj.streetAddress,
      city: userObj.city,
      state: userObj.state,
      zipCode: userObj.zipCode,
      isAdult: userObj.isAdult,
      activities: userObj.activities,
      latitude: userObj.latitude,
      longitude: userObj.longitude,
    });
}

// Func to update user info (completed activities, etc)**in progress**

export function updateUserData(userId, userObj) {
  firebase
    .database()
    .ref('/users/' + userId)
    .update({
      username: userObj.username,
      firstName: userObj.firstName,
      lastName: userObj.lastName,
      email: userObj.email,
      streetAddress: userObj.streetAddress,
      city: userObj.city,
      state: userObj.state,
      zipCode: userObj.zipCode,
      isAdult: userObj.isAdult,
      activities: userObj.activities,
      latitude: userObj.latitude,
      longitude: userObj.longitude,
    });
}

// CRUD funcs for users in firebase db
