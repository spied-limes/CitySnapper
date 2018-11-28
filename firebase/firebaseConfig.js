import * as firebase from 'firebase';
import { firebaseSecrets } from '../secrets';
const firebaseConfig = firebaseSecrets;
// const eaglesJersey = require('../eaglesJersey.jpg');
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

// to store images in storage
export function writeAndCompareImage(image) {
  //Create a storage ref
  // image._data.type = 'image/jpeg';
  const storageRef = firebase
    .storage()
    .ref()
    .child('user1/testing12345.jpg');
  console.log(
    'this is the image',
    'data:image/jpg;base64,' + image.slice(0, 100)
  );
  const reggedBase64 = image;
  console.log('IMAGE: ', typeof image);
  return storageRef
    .putString(image.trim(), 'base64', {
      contentType: 'image/jpg',
    })
    .then(function(snapshot) {
      console.log('uploaded a raw string!');
    });
}

//to store image base64 in database
export async function writeBase64ToDb(image) {
  try {
    const userId = firebase.auth().currentUser
      ? firebase.auth().currentUser.uid
      : 12345;
    await db.ref('/users/' + userId + '/images').set({
      image: image,
    });
  } catch (error) {
    console.error(error);
  }
}

// CRUD funcs for users in firebase db
