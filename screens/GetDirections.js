/* eslint-disable react/no-deprecated */
import React from "react";
import {
  Button,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { GOOGLE_MAPS_APIKEY } from "../secrets";
import MapViewDirections from "react-native-maps-directions";
import MapView, { Marker, AnimatedRegion, Animated } from "react-native-maps";
import { Constants, Location, Permissions } from "expo";

const { width, height } = Dimensions.get("window");
const aspectRatio = width / height;
const mapPadding = { top: 75, right: 75, bottom: 75, left: 75 };

export default class GetDirections extends React.Component {
  static navigationOptions = {
    title: "Directions"
  };
  constructor() {
    super();
    this.state = {
      latitudeDelta: 0.00559,
      longitudeDelta: 0.00475
    };
  }

  fitAllMarkers(markers) {
    this.map.fitToCoordinates(markers, {
      edgePadding: mapPadding,
      animated: true
    });
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

    const markers = [origin, destination];

    return (
      <View style={styles.container}>
        <View style={styles.mapFlexContainer}>
          <MapView
            ref={ref => {
              this.map = ref;
            }}
            region={{
              // This is hardcoded in the snapping dropdown version
              latitude: params.currentLat,
              longitude: params.currentLong,
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
              mode={"walking"}
              strokeWidth={8}
              strokeColor="hotpink"
            />
          </MapView>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Go back" onPress={() => navigate("Map")} />
          <Button title="Go back" onPress={() => navigate("Map")} />
          <Button
            title="Fit Both Markers"
            onPress={() => this.fitAllMarkers(markers)}
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
    flex: 9
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute"
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
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
    // alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "beige"
  }
});
