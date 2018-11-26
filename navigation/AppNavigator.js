import React from "react";
import { createSwitchNavigator } from "react-navigation";

import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import IntroSlider from "../screens/IntroSliderScreens";
import CheckinScreen from "../screens/CheckInScreen";
import GetDirections from "../screens/GetDirections";

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Home: HomeScreen,
  IntroSlider: IntroSlider,
  Map: MapScreen,
  Screen: CheckinScreen,
  Directions: GetDirections
});
