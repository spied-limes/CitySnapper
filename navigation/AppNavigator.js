import React from "react";
import { createSwitchNavigator } from "react-navigation";

import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/NewMapScreen";
import IntroSlider from "../screens/IntroSliderScreens";
import CheckInScreen from "../screens/CheckInScreen";
import GetDirections from "../screens/GetDirections";
import CameraScreen from "../components/CameraScreen";
import QuizScreen from "../screens/QuizScreen";

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Home: HomeScreen,
  IntroSlider: IntroSlider,
  Map: MapScreen,
  CheckIn: CheckInScreen,
  Directions: GetDirections,
  Camera: CameraScreen,
  Quiz: QuizScreen
});
