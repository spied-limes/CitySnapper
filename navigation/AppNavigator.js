import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

<<<<<<< HEAD
import MainTabNavigator from "./MainTabNavigator";
import CheckinScreen from "../screens/CheckInScreen";
import GetDirections from "../screens/GetDirections";
=======
import MainTabNavigator from './MainTabNavigator';
import CheckinScreen from '../screens/CheckInScreen';

>>>>>>> origin/firebaseReduxStore
export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  Screen: CheckinScreen,
<<<<<<< HEAD
  Directions: GetDirections
=======
>>>>>>> origin/firebaseReduxStore
});
