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

import { GOOGLE_MAPS_APIKEY } from "../secrets";
import MapViewDirections from "react-native-maps-directions";
import MapView, { Marker, AnimatedRegion, Animated } from "react-native-maps";
import { Constants, Location, Permissions } from "expo";

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Directions"
  };
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { push, navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

    const origin = {
      latitude: params.currentLat,
      longitude: params.currentLong
    };
    const destination = {
      latitude: params.destLat,
      longitude: params.destLong
    };

    return (
      <View style={styles.container}>
        <View style={styles.mapFlexContainer}>
          <MapView
            region={{
              latitude: (params.currentLat + destination.latitude) / 2,
              longitude: (params.currentLong + destination.longitude) / 2,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA
            }}
            showsUserLocation={true}
            style={styles.map}
            followUserLocation={true}
            showsMyLocationButton={true}
          >
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              mode={"walking"}
              strokeWidth={4}
              strokeColor="hotpink"
            />
            <Marker
              coordinate={destination}
              title={"finish"}
              description={"get here asap!!"}
            />
          </MapView>
        </View>
        <View style={styles.tabBarInfoContainer}>
          <Button title="Go back" onPress={() => navigate("Map")} />
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
    flex: 9
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute"
  },
  tabBarInfoContainer: {
    flex: 1,
    // ...Platform.select({
    //   ios: {
    //     shadowColor: "black",
    //     shadowOffset: { height: -3 },
    //     shadowOpacity: 0.1,
    //     shadowRadius: 3
    //   },
    //   android: {
    //     elevation: 20
    //   }
    // }),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "beige"
  }
});
