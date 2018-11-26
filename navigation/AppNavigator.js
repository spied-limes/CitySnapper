import React from "react";
import { createSwitchNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import HomeScreen from "../screens/HomeScreen";
import IntroSlider from "../screens/IntroSliderScreens";
import CheckinScreen from "../screens/CheckInScreen";
import GetDirections from "../screens/GetDirections";
import QuizScreen from "../screens/QuizScreen";

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Home: HomeScreen,
  IntroSlider: IntroSlider,
  Main: MainTabNavigator,
  Screen: CheckinScreen,
  Directions: GetDirections,
  Quiz: QuizScreen
});
