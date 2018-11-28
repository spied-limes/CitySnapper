/* eslint-disable no-use-before-define */
/* eslint-disable quotes */

import React from "react";
import {
  Button,
  Dimensions,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Layout from "../constants/Layout";
import { navigate } from "react-navigation";
import * as firebase from "firebase";
import {
  writeUserData,
  updateUserActivityData
} from "../firebase/firebaseConfig";
import { connect } from "react-redux";
import {
  watchUserData,
  watchPlaceData,
  watchActivityData
} from "../redux/app-redux";
import Carousel from "react-native-looped-carousel";

const { width, height } = Dimensions.get("window");

let refDataObject = {};

class CheckInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: { width, height },
      borough: "",
      content: "",
      latitude: "",
      latitudeDelta: "",
      longitude: "",
      longitudeDelta: "",
      name: "",
      spectralImage: "",
      splashImage: "",
      streetAddress: "",
      tagline: "",
      wikipediaLink: ""
    };
  }

  componentDidMount = async () => {
    try {
      await this.props.watchUser();
      await this.props.watchActivities();
      await this.props.watchPlaces();
    } catch (error) {
      console.error(error);
    }
  };

  componentDidUpdate = async () => {
    try {
      const { params } = this.props.navigation.state;
      const locationForDB = params.location;

      if (this.props.places && this.props.places[locationForDB]) {
        refDataObject = this.props.places[params.location];
      }
    } catch (error) {
      console.error(error);
    }
  };

  _onLayoutDidChange = e => {
    const layout = e.nativeEvent.layout;
    this.setState({ size: { width: layout.width, height: layout.height } });
  };

  render() {
    const { params } = this.props.navigation.state;
    // console.log(this.props.places);
    // this.props.places[params.location];
    // console.log("locationForDB");
    // console.log(locationForDB);
    // console.log("\n\nthis.props.places[params.location].splashImage");
    // console.log("\n\nthis.props.places");
    // console.log(this.props.places);

    // this.props.places && const {
    //   borough,
    //   content,
    //   latitude,
    //   latitudeDelta,
    //   longitude,
    //   longitudeDelta,
    //   name,
    //   spectralImage,
    //   splashImage,
    //   streetAddress,
    //   tagline,
    //   wikipediaLink
    // } = refDataObject;

    // console.log("splashImage");
    // console.log(splashImage); // NOPE

    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/* ########## BG IMAGE ########## */}
        <ImageBackground
          source={require("../assets/images/timesSquare.jpg")}
          style={{ width: undefined, height: Layout.checkInImageHeight }}
        >
          {/* ########## BG OVERLAY BOX ########## */}
          <View style={styles.bgOverlayBox}>
            {/* ########## NAV BOX ########## */}
            <View style={styles.navBox}>
              <View>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Map")}
                >
                  <Ionicons
                    name={
                      Platform.OS === "ios" ? `ios-arrow-back` : "md-arrow-back"
                    }
                    size={40}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.borough}>Manhattan</Text>
              </View>
            </View>
            {/* ########## INFO BOX ########## */}
            <View style={styles.infoBox}>
              <Text style={styles.locationName}>Times Square</Text>
              <Text style={styles.locationTagline}>
                Crossroads of the World
              </Text>
              <Text style={styles.infoBoxText}>
                One of the world's busiest pedestrian areas, it is also the hub
                of the Broadway Theater District and a major center of the
                world's entertainment industry. Times Square is one of the
                world's most visited tourist attractions, drawing an estimated
                50 million visitors annually.
              </Text>
              <Text style={styles.infoBoxText}>
                {/* you have checked in to {params.name} */}
              </Text>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.activityBox} onLayout={this._onLayoutDidChange}>
          <Carousel
            style={this.state.size}
            leftArrowText={"＜"}
            leftArrowStyle={{ color: "white", fontSize: 30, marginLeft: 20 }}
            rightArrowText={"＞"}
            rightArrowStyle={{ color: "white", fontSize: 30, marginRight: 20 }}
            arrows
            autoplay={false}
            currentPage={3}
            onAnimateNextPage={p => console.log(p, "is current page")}
          >
            <View style={[styles.activityButtonBox, this.state.size]}>
              {/* <ImageBackground
                source={require("../assets/images/ESB2-BW.jpg")}
                style={styles.overlayImage}
              > */}
              <TouchableOpacity
                style={styles.stretchActivityButton}
                onPress={() => this.props.navigation.navigate("Camera")}
              >
                <Text style={styles.stretchActivityButtonText}>
                  Recreate a Historical Photo
                </Text>
              </TouchableOpacity>
              {/* </ImageBackground> */}
            </View>
            <View style={[styles.activityButtonBox, this.state.size]}>
              <TouchableOpacity
                style={styles.stretchActivityButton}
                onPress={() => this.props.navigation.navigate("Quiz")}
              >
                <Text style={styles.stretchActivityButtonText}>
                  Test Your Knowledge
                </Text>
              </TouchableOpacity>
            </View>
          </Carousel>
        </View>
      </SafeAreaView>
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
)(CheckInScreen);

const styles = StyleSheet.create({
  bgOverlayBox: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  navBox: {
    marginTop: 28,
    paddingHorizontal: 20,
    flex: 1.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  borough: {
    color: "white",
    fontFamily: "Abril-FatFace",
    fontSize: 24,
    textShadowColor: "rgba(0, 0, 0, 0.95)",
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 2
  },
  infoBox: {
    flex: 9,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 30,
    color: "white"
    // backgroundColor: "rgba(0,0,0,0.5)"
  },
  locationName: {
    color: "white",
    fontFamily: "Abril-FatFace",
    fontSize: 48,
    lineHeight: 52,
    flexWrap: "wrap",
    textShadowColor: "rgba(0, 0, 0, 0.95)",
    textShadowOffset: { width: -1, height: 2 },
    textShadowRadius: 10
  },
  locationTagline: {
    color: "white",
    fontSize: 16,
    paddingBottom: 5,
    textShadowColor: "rgba(0, 0, 0, 0.95)",
    textShadowOffset: { width: -1, height: 2 },
    textShadowRadius: 2
  },
  infoBoxText: {
    color: "white",
    fontSize: 16,
    paddingTop: 10,
    textShadowColor: "rgba(0, 0, 0, 0.95)",
    textShadowOffset: { width: -1, height: 2 },
    textShadowRadius: 2
  },
  activityBox: {
    flex: 1,
    height: Layout.activityBoxHeight,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center"
  },
  activityButtonBox: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "navy"
  },
  overlayImage: {
    width: "100%",
    height: Layout.activityBoxHeight,
    resizeMode: "cover"
  },
  stretchActivityButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  stretchActivityButtonText: {
    color: "white",
    fontSize: 24,
    fontFamily: "Abril-FatFace",
    textShadowColor: "rgba(0, 0, 0, 0.95)",
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 2,
    zIndex: 10
  },
  activityHeadline: {
    color: "white",
    flex: 1,
    fontSize: 24,
    fontFamily: "Abril-FatFace"
  }
});
