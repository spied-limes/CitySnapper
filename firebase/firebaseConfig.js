import * as firebase from 'firebase';
import { firebaseSecrets } from '../secrets';
// initialize firebase
const firebaseConfig = firebaseSecrets;
// const b64toBlob = require('b64-to-blob');

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
  image._data.type = 'image/jpg';
  const storageRef = firebase
    .storage()
    .ref()
    .child('user1/testing123456');
  console.log('this is the image', image);

  return storageRef.put(image).then(function(snapshot) {
    console.log('uploaded a raw string!');
  });
}

// CRUD funcs for users in firebase db
