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
  TextInput,
  Dimensions
} from "react-native";
import MapView, { Marker, AnimatedRegion, Animated } from "react-native-maps";
import DropdownMenu from "react-native-dropdown-menu";
import { Constants, Location, Permissions } from "expo";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.00922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor() {
    super();
    this.state = {
      longitude: 50.567,
      latitude: 50.765,
      text: "Current Location",
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

    this.setState({
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
      currentLong: location.coords.longitude,
      currentLat: location.coords.latitude
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
        //times square
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
          {/*
    ____                       __
   / __ \_________  ____  ____/ /___ _      ______
  / / / / ___/ __ \/ __ \/ __  / __ \ | /| / / __ \
 / /_/ / /  / /_/ / /_/ / /_/ / /_/ / |/ |/ / / / /
/_____/_/   \____/ .___/\__,_/\____/|__/|__/_/ /_/
                /_/
          */}
          <View style={styles.topButtons}>
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
                <Text>Location: {this.state.text}</Text>
                <Text>Lat: {this.state.latitude}</Text>
                <Text>Lng: {this.state.longitude}</Text>
              </View>
            </DropdownMenu>
            {/*
   ________              __         ____         ____        __  __
  / ____/ /_  ___  _____/ /__      /  _/___     / __ )__  __/ /_/ /_____  ____
 / /   / __ \/ _ \/ ___/ //_/_____ / // __ \   / __  / / / / __/ __/ __ \/ __ \
/ /___/ / / /  __/ /__/ ,< /_____// // / / /  / /_/ / /_/ / /_/ /_/ /_/ / / / /
\____/_/ /_/\___/\___/_/|_|     /___/_/ /_/  /_____/\__,_/\__/\__/\____/_/ /_/
        */}
            {this.state.latitude === this.state.currentLat &&
            this.state.longitude === this.state.currentLong ? (
              <Button
                style={{ flex: 1 }}
                onPress={() => navigate("Screen", { name: this.state.text })}
                title="Check In"
                color="#841584"
              />
            ) : (
              <Button
                style={{ flex: 1, alignItems: "center" }}
                onPress={() =>
                  navigate("Directions", {
                    destLat: this.state.latitude,
                    destLong: this.state.longitude,
                    currentLong: this.state.currentLong,
                    currentLat: this.state.currentLat
                  })
                }
                title="Get Directions"
                color="#841584"
              />
            )}
          </View>
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
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA
            }}
            showsUserLocation={true}
            style={styles.map}
            showsMyLocationButton={true}
          >
            {coordinates.map(marker => (
              // eslint-disable-next-line react/jsx-key
              <Marker
                key={marker.longitude}
                coordinate={marker}
                title={"hi"}
                description={"lol"}
              />
            ))}
          </MapView>
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
  topButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 25
  },
  mapFlexContainer: {
    flex: 4
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute"
  },
  mapCommentContainer: {
    flex: 2,
    padding: 15,
    backgroundColor: "beige",
    zIndex: 10
  },
  mapComment: {
    fontSize: 18,
    textAlign: "center",
    justifyContent: "center",
    color: "white"
  }
});
