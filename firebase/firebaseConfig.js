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

export function writeAndCompareImage(image) {
  //Create a storage ref

  const storageRef = firebase
    .storage()
    .ref()
    .child('user1/testing123');

  //Upload file
  // console.log('about to create TASK', image.base64.slice(0, 23));
  storageRef.putString(image, 'base64').then(function(snapshot) {
    console.log('uploaded a base64 string!');
  });
}

// CRUD funcs for users in firebase db
