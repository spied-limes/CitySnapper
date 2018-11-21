/* eslint-disable no-use-before-define */
/* eslint-disable quotes */

import React from "react";
import {
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
import LocationText from "../components/StyledText";

export default class CheckInScreen extends React.Component {
  render() {
    const { params } = this.props.navigation.state;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <ImageBackground
            source={require("../assets/images/timesSquare.jpg")}
            style={{ width: "100%", height: 450 }}
          >
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
            <View style={styles.infoBox}>
              <Text style={styles.locationName}>Times Square</Text>
              <Text style={styles.infoBoxText}>Hello Matess! </Text>
              <Text style={styles.infoBoxText}>
                you have checked in to {params.name}
              </Text>
            </View>
          </ImageBackground>
          <View>
            <Text>ACTIVITIES GO HERE</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  locationDetailsBox: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover"
  },
  navBox: {
    marginTop: 28,
    paddingHorizontal: 20,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  locationName: {
    color: "white",
    fontFamily: "Abril-FatFace",
    fontSize: 30
  },
  borough: {
    color: "white",
    fontSize: 20
  },
  infoBox: {
    flex: 9,
    paddingTop: 15,
    color: "white"
  },
  infoBoxText: {
    color: "white"
  },
  activityBox: {
    flex: 1
  }
});
