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

  const storageRef = firebase.storage().ref('user1/' + 'testing');

  //Upload file
  console.log('about to create TASK');
  storageRef.putString(image.base64).then(function(snapshot) {
    console.log('uploaded a base64 string!');
  });

  // request.post(
  //   {
  //     url: 'https://api.deepai.org/api/image-similarity',
  //     headers: {
  //       'Api-Key': 'dee9c22b-8f05-443e-8cfb-f8c4d48f53a7',
  //     },
  //     formData: {
  //       image1: image.uri,
  //       image2: image.uri,
  //     },
  //   },
  //   function callback(err, httpResponse, body) {
  //     console.log('got in here');
  //     if (err) {
  //       console.error('request failed:', err);
  //       return;
  //     }
  //     var response = JSON.parse(body);
  //     console.log(response);
  //   }
  // );
}

// CRUD funcs for users in firebase db
