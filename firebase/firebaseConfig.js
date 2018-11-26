import * as firebase from 'firebase';
import { firebaseSecrets } from '../secrets';
import { watchActivityData } from '../redux/app-redux';

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
      places: userObj.places,
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

export async function updateUserActivityData(placeId, activityId, activityObj) {
  const userId = await firebase.auth().currentUser.uid;

  let prevActivityData = await userActivityUpdateHelper(
    userId,
    placeId,
    activityId
  );
  let newUserActivity = activityObj;

  console.log(
    '\nupdate func activityData: ',
    prevActivityData,
    '\nupdate func newUserActivities',
    newUserActivity
  );

  await firebase
    .database()
    .ref('/users/' + userId + '/places/' + placeId + '/actvities/')
    .update({
      activityId: { ...prevActivityData, newUserActivity },
    });
}
// CRUD funcs for users in firebase db
