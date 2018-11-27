import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Text, Image } from "react-native";
import { connect } from "react-redux";
import {
  watchUserData,
  watchPlaceData,
  watchActivityData
} from "../redux/app-redux";
import * as firebase from "firebase";
import {
  writeUserData,
  updateUserActivityData
} from "../firebase/firebaseConfig";
import { navigate } from "react-navigation";
import { LinearGradient } from "expo";
import AppIntroSlider from "react-native-app-intro-slider";

/*
    ____      __            _____ ___     __
   /  _/___  / /__________ / ___// (_)___/ /__  _____
   / // __ \/ __/ ___/ __ \\__ \/ / / __  / _ \/ ___/
 _/ // / / / /_/ /  / /_/ /__/ / / / /_/ /  __/ /
/___/_/ /_/\__/_/   \____/____/_/_/\__,_/\___/_/
*/

class IntroSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: ""
    };
  }
  _renderItem = props => (
    <LinearGradient
      style={[
        styles.mainContent,
        {
          paddingTop: props.topSpacer,
          paddingBottom: props.bottomSpacer,
          width: props.width,
          height: props.height
        }
      ]}
      colors={props.colors}
      start={{ x: 0, y: 0.1 }}
      end={{ x: 0.1, y: 1 }}
    >
      <Ionicons
        style={{ backgroundColor: "transparent" }}
        name={props.icon}
        size={200}
        color="white"
      />
      <View>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </LinearGradient>
  );

  render() {
    /*
   _____ ___     __
  / ___// (_)___/ /__  _____
  \__ \/ / / __  / _ \/ ___/
 ___/ / / / /_/ /  __(__  )
/____/_/_/\__,_/\___/____/
*/

    const slides = [
      {
        key: "somethun",
        title: `Welcome ${this.props.userData && this.props.userData.name}!`,
        text:
          "We can use these pages to teach our users how to use our app BEFORE they reach the first screen!",
        icon: "ios-images",
        colors: ["#63E2FF", "#B066FE"]
      },
      {
        key: "somethun1",
        title: "Another title!",
        text: "We can change the colors of each page too.",
        icon: "ios-options",
        colors: ["#A3A1FF", "#3A3897"]
      },
      {
        key: "somethun2",
        title: "Powered by BEER",
        text: "No beers were harmed in the development of this app.",
        icon: "ios-beer",
        colors: ["#29ABE2", "#4F00BC"]
      }
    ];

    return (
      <AppIntroSlider
        slides={slides}
        renderItem={this._renderItem}
        // bottomButton
        showPrevButton
        showSkipButton
        // hideNextButton
        // hideDoneButton
        onSkip={() => {
          console.log("\n\nSkip button pressed");
          this.props.navigation.navigate("Map");
        }}
        onDone={() => {
          console.log("\nDone button pressed");
          this.props.navigation.navigate("Map");
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.userData,
    activities: state.activities,
    places: state.places
  };
};

const mapDispatchToProps = dispatch => {
  return {
    watchUser: () => dispatch(watchUserData()),
    watchActivities: () => dispatch(watchActivityData()),
    watchPlaces: () => dispatch(watchPlaceData())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IntroSlider);

/*
   _____ __        __
  / ___// /___  __/ /__  _____
  \__ \/ __/ / / / / _ \/ ___/
 ___/ / /_/ /_/ / /  __(__  )
/____/\__/\__, /_/\___/____/
         /____/
*/

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around"
  },
  image: {
    width: 320,
    height: 320
  },
  text: {
    color: "rgba(255, 255, 255, 0.8)",
    backgroundColor: "transparent",
    textAlign: "center",
    paddingHorizontal: 16,
    fontSize: 18
  },
  title: {
    fontSize: 30,
    color: "white",
    backgroundColor: "transparent",
    textAlign: "center",
    marginBottom: 16
  }
});
