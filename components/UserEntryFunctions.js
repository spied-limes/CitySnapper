import { Alert } from "react-native";
import * as firebase from "firebase";
import { writeUserData } from "../firebase/firebaseConfig";

/*
   _____ _             ____        __
  / ___/(_)___ _____  / __ \__  __/ /_
  \__ \/ / __ `/ __ \/ / / / / / / __/
 ___/ / / /_/ / / / / /_/ / /_/ / /_
/____/_/\__, /_/ /_/\____/\__,_/\__/
       /____/
*/
export const signOutUser = async () => {
  try {
    await firebase.auth().signOut();
    firebase.auth().currentUser &&
      console.log("currentUser: ", firebase.auth().currentUser.uid);
    // navigate('Auth');

    // alert box to user---------

    Alert.alert(
      "Logout Status",
      "Logout Successful",
      [
        {
          text: "OK",
          onPress: () => {
            console.log("OK Pressed");
            this.setState({
              email: "",
              password: ""
            });
          }
        }
      ],
      {
        cancelable: false
      }
    );
  } catch (error) {
    console.log(error);
  }
};

/*
    __                ____
   / /   ____  ____ _/  _/___
  / /   / __ \/ __ `// // __ \
 / /___/ /_/ / /_/ // // / / /
/_____/\____/\__, /___/_/ /_/
            /____/
*/
export const loginUser = async (email, password) => {
  try {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function(user) {
        console.log("userLoggedIn: ", user);
      });

    // alert box to user---------

    Alert.alert(
      "Login Status",
      "Login Successful",
      [
        {
          text: "OK",
          onPress: () => {
            console.log("OK Pressed");
            this.setState({
              email: "",
              password: ""
            });
          }
        }
      ],
      {
        cancelable: false
      }
    );
  } catch (error) {
    console.log(error.toString());
    Alert.alert(
      "Login Status",
      "Login Failed",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  }
};

/*
   _____ _             __  __
  / ___/(_)___ _____  / / / /___
  \__ \/ / __ `/ __ \/ / / / __ \
 ___/ / / /_/ / / / / /_/ / /_/ /
/____/_/\__, /_/ /_/\____/ .___/
       /____/           /_/
*/

export const signUpUser = async (email, password) => {
  try {
    if (this.state.password.length < 6) {
      Alert.alert(
        "Sign Up Failed",
        "Password must be longer than 6 characters",
        [
          // {
          //   text: 'Cancel',
          //   onPress: () => console.log('Cancel Pressed'),
          //   style: 'cancel',
          // },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        {
          cancelable: false
        }
      );
      console.log("Password must be longer than 6 characters");
      return;
    }
    // create user in firebase auth page (email, pass, userId)
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    // capture current userID directly after creation
    const userId = firebase.auth().currentUser.uid;
    console.log("HomeScreen auth() userId: ", userId);

    // custom func that (hopefully) writes a user entry in database matched by userId
    await writeUserData(userId, {
      username: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      streetAddress: this.state.streetAddress,
      city: this.state.city,
      state: this.state.state,
      zipCode: this.state.zipCode,
      isAdult: this.state.isAdult,
      activities: {} /*will be additional func to ad activiy IDs to user entry*/,
      // current location should be these below
      latitude: "",
      longitude: ""
    });

    // alert box to user---------
    Alert.alert(
      "Sign Up Status",
      "Sign Up Successful",
      [
        // {
        //   text: 'Cancel',
        //   onPress: () => console.log('Cancel Pressed'),
        //   style: 'cancel',
        // },
        {
          text: "OK",
          onPress: () => this.props.navigation.navigate("Map")
        }
      ],
      {
        cancelable: false
      }
    );
  } catch (error) {
    console.log(error.toString());
    Alert.alert(
      "Sign Up Status",
      "Sign Up Failed",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  }
};
