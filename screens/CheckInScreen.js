/* eslint-disable no-use-before-define */
/* eslint-disable quotes */

import React from "react";
import {
  Button,
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

export default class CheckInScreen extends React.Component {
  render() {
    const { params } = this.props.navigation.state;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
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
                        Platform.OS === "ios"
                          ? `ios-arrow-back`
                          : "md-arrow-back"
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
                  One of the world's busiest pedestrian areas, it is also the
                  hub of the Broadway Theater District and a major center of the
                  world's entertainment industry. Times Square is one of the
                  world's most visited tourist attractions, drawing an estimated
                  50 million visitors annually.
                </Text>
                <Text style={styles.infoBoxText}>
                  you have checked in to {params.name}
                </Text>
              </View>
            </View>
          </ImageBackground>
          <View style={styles.activityBox}>
            <Text style={styles.activityHeadline}>ACTIVITIES GO HERE</Text>
            <Button
              style={{ flex: 1, alignItems: "center" }}
              onPress={() => this.props.navigation.navigate("Camera")}
              title="Open Camera"
              color="#841584"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

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
    paddingHorizontal: 20,
    height: Layout.activityBoxHeight,
    backgroundColor: "black"
  },
  activityHeadline: {
    color: "white",
    flex: 1,
    fontSize: 24,
    fontFamily: "Abril-FatFace"
  }
});
