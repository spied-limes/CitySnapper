import * as firebase from "firebase";
import { firebaseSecrets } from "../secrets";

// initialize firebase
const firebaseConfig = firebaseSecrets;

firebase.initializeApp(firebaseConfig);

export const db = firebase.database();

// Func to write a new UserId entry in /users when a new user signs up.
export async function writeUserData(userId, userObj) {
  try {
    await firebase
      .database()
      .ref("/users/" + userId)
      .set({
        name: userObj.name,
        email: userObj.email,
        homebaseLatitude: "",
        homebaseLongitude: "",
        places: "object"
      });
  } catch (error) {
    console.error(error);
  }
}
// CRUD funcs for users in firebase db
// -------------------------------------

// Func to update user current location
// Not currently in use
// export async function updateUserCurrentLocation(userId, userObj) {
//   try {
//     await firebase
//       .database()
//       .ref("/users/" + userId)
//       .update({
//         currentLatitude: userObj.currentLatitude,
//         currentLongitude: userObj.currentLongitude
//       });
//   } catch (error) {
//     console.error(error);
//   }
// }

// Func to update user HOMEBASE (where they're staying) location

export async function setUserHomebaseLocation(userId, userObj) {
  try {
    await firebase
      .database()
      .ref("/users/" + userId)
      .update({
        homebaseLatitude: userObj.homebaseLatitude,
        homebaseLongitude: userObj.homebaseLongitude
      });
  } catch (error) {
    console.error(error);
  }
}

// activityObj should have { active: boolean, complete:boolean}
export async function updateUserActivityData(placeId, activityId, activityObj) {
  try {
    const userId = await firebase.auth().currentUser.uid;

    let prevActivityData = await userActivityUpdateHelper(
      userId,
      placeId,
      activityId
    );

    console.log(
      "\nupdate func activityData: ",
      prevActivityData,
      "\nupdate func activityObj",
      activityObj
    );

    await firebase
      .database()
      .ref(
        "/users/" + userId + "/places/" + placeId + "/actvities/" + activityId
      )
      .update({
        ...prevActivityData,
        ...activityObj
      });
  } catch (error) {
    console.error(error);
  }
}

//helper for above func updateUserActivityData
async function userActivityUpdateHelper(userId, placeId, activityId) {
  try {
    let activityData;

    await db
      .ref(
        "/users/" + userId + "/places/" + placeId + "/actvities/" + activityId
      )
      .on(
        "value",
        function(snapshot) {
          activityData = snapshot.val();
        },
        function(error) {
          console.log(error);
        }
      );
    console.log("helper func userActivityData: ", activityData);
    return activityData;
  } catch (error) {
    console.error(error);
  }
}
