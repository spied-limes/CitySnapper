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

import { GOOGLE_MAPS_APIKEY } from "../secrets";
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
      latitudeDelta: 0.005596,
      longitudeDelta: 0.00475
    };
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
              strokeWidth={4}
              strokeColor="hotpink"
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
