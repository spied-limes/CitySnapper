/* eslint-disable react/no-deprecated */
import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  TextInput
} from "react-native";

import MapViewDirections from "react-native-maps-directions";

import { createStackNavigator } from "react-navigation";
import MapView, { Marker, AnimatedRegion, Animated } from "react-native-maps";
import DropdownMenu from "react-native-dropdown-menu";
import { Constants, Location, Permissions } from "expo";
import CheckinScreen from "./CheckInScreen";

const CheckIn = createStackNavigator({
  CheckIn: CheckinScreen
});

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {
      longitude: 40.6,
      latitude: -74,
      latitudeDelta: 0.003596,
      longitudeDelta: 0.00175,
      // test values
      // latitudeDelta: 0.15,
      // longitudeDelta: 0.75,
      errorMessage: null,
      text: "Dropdown on auto-locate map screen.",
      // for current storage
      currentLat: null,
      currentLong: null
    };
  }

  // This componentWillMount does the work of getInitialState() in setting up the region
  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log("Current location below");
    console.log(location);
    this.setState({
      longitude: location.coords.longitude,
      latitude: location.coords.latitude
    });
  };

  render() {
    const { push, navigate } = this.props.navigation;

    // DROPDOWN DATA
    const data = [
      [
        "Times Square",
        "Fullstack Academy",
        "World Trade Center",
        "Museum of Sex"
      ]
    ]; //will have to be data
    const coordinates = [
      {
        latitude: 40.7589,
        longitude: -73.9851
      },
      {
        latitude: 40.7051,
        longitude: -74.0092
      },
      {
        latitude: 40.7118,
        longitude: -74.0131
      },
      {
        latitude: 40.7441,
        longitude: -73.9874
      }
    ];

    return (
      <View style={styles.container}>
        {/*
  ______               ____
 /_  __/___  ____     / __ )____  _  __
  / / / __ \/ __ \   / __  / __ \| |/_/
 / / / /_/ / /_/ /  / /_/ / /_/ />  <
/_/  \____/ .___/  /_____/\____/_/|_|
         /_/
       */}
        <View style={styles.mapCommentContainer}>
          <Text style={styles.mapComment}>✔ Smooth map movement</Text>
          <Text style={styles.mapComment}>✔ Snap to dropdown location </Text>
        </View>
        {/*
    __  ___               _    ___
   /  |/  /___ _____     | |  / (_)__ _      __
  / /|_/ / __ `/ __ \    | | / / / _ \ | /| / /
 / /  / / /_/ / /_/ /    | |/ / /  __/ |/ |/ /
/_/  /_/\__,_/ .___/     |___/_/\___/|__/|__/
            /_/
        */}
        <View style={styles.mapFlexContainer}>
          <MapView
            region={{
              // This is hardcoded in the snapping dropdown version
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: this.state.latitudeDelta,
              longitudeDelta: this.state.longitudeDelta
            }}
            showsUserLocation={true}
            style={styles.map}
          />
        </View>
        <View style={styles.tabBarInfoContainer}>
          {/*
   ________              __         ____         ____        __  __
  / ____/ /_  ___  _____/ /__      /  _/___     / __ )__  __/ /_/ /_____  ____
 / /   / __ \/ _ \/ ___/ //_/_____ / // __ \   / __  / / / / __/ __/ __ \/ __ \
/ /___/ / / /  __/ /__/ ,< /_____// // / / /  / /_/ / /_/ / /_/ /_/ /_/ / / / /
\____/_/ /_/\___/\___/_/|_|     /___/_/ /_/  /_____/\__,_/\__/\__/\____/_/ /_/
        */}
          {this.state.latitude && this.state.longitude ? (
            <Button
              style={{ flex: 1 }}
              onPress={() => navigate("Screen", { name: this.state.text })}
              title="Check In"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
          ) : (
            <Text> Nah you can't checkk in</Text>
          )}
          {/*
    ____                       __
   / __ \_________  ____  ____/ /___ _      ______
  / / / / ___/ __ \/ __ \/ __  / __ \ | /| / / __ \
 / /_/ / /  / /_/ / /_/ / /_/ / /_/ / |/ |/ / / / /
/_____/_/   \____/ .___/\__,_/\____/|__/|__/_/ /_/
                /_/
          */}
          <DropdownMenu
            style={{ flex: 1 }}
            bgColor={"white"}
            tintColor={"#000000"}
            optionTextStyle={{ color: "red" }}
            activityTintColor={"green"} // checkImage={} // arrowImg={}
            titleStyle={{ color: "#333333" }}
            // maxHeight={300}
            handler={(selection, row) =>
              this.setState({
                text: data[selection][row],
                latitude: coordinates[row].latitude,
                longitude: coordinates[row].longitude
              })
            }
            data={data}
          >
            {/*
    ____        __  __                     ____
    / __ )____  / /_/ /_____  ____ ___     / __ )____  _  __
    / __  / __ \/ __/ __/ __ \/ __ `__ \   / __  / __ \| |/_/
    / /_/ / /_/ / /_/ /_/ /_/ / / / / / /  / /_/ / /_/ />  <
    /_____/\____/\__/\__/\____/_/ /_/ /_/  /_____/\____/_/|_|
  */}
            <View style={{ flex: 1 }}>
              <Text>{this.state.text} is current location</Text>
              <Text>Lat: {this.state.latitude}</Text>
              <Text>Long: {this.state.longitude}</Text>
            </View>
          </DropdownMenu>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 27,
    backgroundColor: "#fff"
  },
  mapFlexContainer: {
    flex: 7
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute"
  },
  mapCommentContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: "beige"
  },
  mapComment: {
    fontSize: 18,
    textAlign: "center",
    justifyContent: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  tabBarInfoContainer: {
    flex: 3,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "beige",
    paddingVertical: 50
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  }
});
