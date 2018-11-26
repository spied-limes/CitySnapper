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

async function userActivityUpdateHelper() {
  const userId = firebase.auth().currentUser.uid;

  let activityData;

  await db.ref('/users/' + userId + '/activities/').on(
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

export async function updateUserActivityData(userId, userObj) {
  let activityData = userActivityUpdateHelper();
  let newUserActivities = userObj.activities;
  console.log(
    '\nupdate func activityData: ',
    activityData,
    '\nupdate func newUserActivities',
    newUserActivities
  );

  await firebase
    .database()
    .ref('/users/' + userId)
    .update({
      activities: { ...activityData, newUserActivities },
    });
}
// CRUD funcs for users in firebase db
