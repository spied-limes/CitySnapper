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
      name: userObj.name,
      email: userObj.email,
      activities: userObj.activities,
      latitude: userObj.latitude,
      longitude: userObj.longitude,
    });
}

// Func to update user info (completed activities, etc)**in progress**

export function updateUserLocationData(userId, userObj) {
  firebase
    .database()
    .ref('/users/' + userId)
    .update({
      latitude: userObj.latitude,
      longitude: userObj.longitude,
    });
}

export function updateUserActivityData(userId, userObj) {
  firebase
    .database()
    .ref('/users/' + userId)
    .update({
      activities: userObj.activities,
    });
}
// CRUD funcs for users in firebase db
