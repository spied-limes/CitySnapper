import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default {
  window: {
    width,
    height
  },
  isSmallDevice: width < 375,
  marginTop: 28,
  checkInImageHeight: height * 0.65,
  activityBoxHeight: height * 0.35
};
