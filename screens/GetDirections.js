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
import MapView, { Marker, AnimatedRegion, Animated } from "react-native-maps";
import { Constants, Location, Permissions } from "expo";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Directions"
  };

  constructor() {
    super();
    this.state = {
      longitude: 40.7589,
      latitude: -73.9851,
      latitudeDelta: 0.005596,
      longitudeDelta: 0.00475,
      errorMessage: null,
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

    this.setState({
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
      currentLong: location.coords.longitude,
      currentLat: location.coords.latitude
    });
  };

  render() {
    const { push, navigate } = this.props.navigation;

    const origin = {
      //times square
      latitude: this.state.currentLat,
      longitude: this.state.currentLong
    };
    const destination = {
      latitude: 40.7051,
      longitude: -74.0092
    };

    const GOOGLE_MAPS_APIKEY = "AIzaSyCLZjJBLTchTPwPkEQzkewu3RJ1D_3iFsI";

    return (
      <View style={styles.container}>
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
          >
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              // mode={"walking"}
            />
          </MapView>
        </View>
        <View style={styles.tabBarInfoContainer}>
          <Button
            title="Go back"
            onPress={() => this.props.navigation.navigate("Map")}
          />
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
