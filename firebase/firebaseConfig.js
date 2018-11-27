import * as firebase from 'firebase';
import { firebaseSecrets } from '../secrets';

// initialize firebase
const firebaseConfig = firebaseSecrets;

firebase.initializeApp(firebaseConfig);

export const db = firebase.database();

// Func to write a new UserId entry in /users when a new user signs up.
export async function writeUserData(userId, userObj) {
  await firebase
    .database()
    .ref('/users/' + userId)
    .set({
      name: userObj.name,
      email: userObj.email,
      latitude: userObj.latitude,
      longitude: userObj.longitude,
      places: 'object',
    });
}
// CRUD funcs for users in firebase db
// -------------------------------------

// Func to update user current location

export async function updateUserCurrentLocation(userId, userObj) {
  await firebase
    .database()
    .ref('/users/' + userId)
    .update({
      currentLatitude: userObj.latitude,
      currentLongitude: userObj.longitude,
    });
}

// Func to update user HOMEBASE (where they're staying) location

export async function setUserHomebaseLocation(userId, userObj) {
  await firebase
    .database()
    .ref('/users/' + userId)
    .update({
      homebaseLatitude: userObj.latitude,
      homebaseLongitude: userObj.longitude,
    });
}

// activityObj should have { active: boolean, complete:boolean}
export async function updateUserActivityData(placeId, activityId, activityObj) {
  const userId = await firebase.auth().currentUser.uid;

  let prevActivityData = await userActivityUpdateHelper(
    userId,
    placeId,
    activityId
  );

  console.log(
    '\nupdate func activityData: ',
    prevActivityData,
    '\nupdate func activityObj',
    activityObj
  );

  await firebase
    .database()
    .ref('/users/' + userId + '/places/' + placeId + '/actvities/' + activityId)
    .update({
      ...prevActivityData,
      ...activityObj,
    });
}

//helper for above func updateUserActivityData
async function userActivityUpdateHelper(userId, placeId, activityId) {
  let activityData;

  await db
    .ref('/users/' + userId + '/places/' + placeId + '/actvities/' + activityId)
    .on(
      'value',
      function(snapshot) {
        activityData = snapshot.val();
      },
      function(error) {
        console.log(error);
      }
    );
  console.log('helper func userActivityData: ', activityData);
  return activityData;
}
