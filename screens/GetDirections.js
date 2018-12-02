/* eslint-disable react/no-deprecated */
import React from 'react';
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
  View,
} from 'react-native';

import { GOOGLE_MAPS_APIKEY } from '../secrets';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker, AnimatedRegion, Animated } from 'react-native-maps';
import { Constants, Location, Permissions } from 'expo';

const { width, height } = Dimensions.get('window');
const mapPadding = { top: 100, right: 100, bottom: 100, left: 100 };

export default class GetDirections extends React.Component {
  static navigationOptions = {
    title: 'Directions',
  };
  constructor() {
    super();
    this.state = {
      latitudeDelta: 0.003,
      longitudeDelta: 0.0015,
      size: { width, height },
    };
  }

  // Both of these functions use `this.map`, a ref created INSIDE the <MapView /> component
  currentLocationRefocus(region) {
    this.map.animateToRegion(region, 1500);
  }

  fitAllMarkers(markers) {
    this.map.fitToCoordinates(markers, {
      edgePadding: mapPadding,
      animated: true,
    });
  }
  _onLayoutDidChange = e => {
    const layout = e.nativeEvent.layout;
    this.setState({ size: { width: layout.width, height: layout.height } });
  };

  render() {
    const { push, navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

    console.log('params');
    console.log(params);
    const origin = {
      latitude: 40.7051,
      longitude: -74.0092,
    };
    const destination = {
      latitude: params.destLat,
      longitude: params.destLong,
    };

    console.log('destination');
    console.log(destination);
    // Both const below are args passed into class methods for button onPress
    const markers = [origin, destination];
    const region = {
      latitude: params.currentLat,
      longitude: params.currentLong,
      latitudeDelta: this.state.latitudeDelta,
      longitudeDelta: this.state.longitudeDelta,
    };

    return (
      <View style={styles.container}>
        <View style={styles.mapFlexContainer}>
          <MapView
            ref={ref => {
              this.map = ref;
            }}
            region={{
              // This is here for currentLocationRefocus
              latitude: params.currentLat,
              longitude: params.currentLong,
              latitudeDelta: this.state.latitudeDelta,
              longitudeDelta: this.state.longitudeDelta,
            }}
            showsUserLocation={true}
            followsUserLocation={true}
            style={styles.map}
          >
            <MapView.Marker coordinate={origin} />
            <MapView.Marker coordinate={destination} />
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              mode={'walking'}
              strokeWidth={8}
              strokeColor="green"
            />
          </MapView>
        </View>
        {/*
 ____    ____  __ __      ____   __ __  ______  ______   ___   ____   _____
|    \  /    ||  |  |    |    \ |  |  ||      ||      | /   \ |    \ / ___/
|  _  ||  o  ||  |  |    |  o  )|  |  ||      ||      ||     ||  _  (   \_
|  |  ||     ||  |  |    |     ||  |  ||_|  |_||_|  |_||  O  ||  |  |\__  |
|  |  ||  _  ||  :  |    |  O  ||  :  |  |  |    |  |  |     ||  |  |/  \ |
|  |  ||  |  | \   /     |     ||     |  |  |    |  |  |     ||  |  |\    |
|__|__||__|__|  \_/      |_____| \__,_|  |__|    |__|   \___/ |__|__| \___|

 */}
        <View style={styles.locationButtonBox}>
          {/* <View style={styles.bgColorOverlay}> */}
          <View style={styles.locationActivityButtonBox}>
            <TouchableOpacity
              style={styles.locationActivityButton}
              onPress={() => navigate('Map')}
            >
              <Text style={styles.stretchLocationButtonText}>Go Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.locationActivityButton}
              onPress={() => this.currentLocationRefocus(region)}
            >
              <Text style={styles.stretchLocationButtonText}>
                Focus on Current Location
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.locationActivityButton}
              onPress={() => this.fitAllMarkers(markers)}
            >
              <Text style={styles.stretchLocationButtonText}>Fit Both</Text>
            </TouchableOpacity>
          </View>
          {/* </View> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 27,
  },
  mapFlexContainer: {
    flex: 9,
  },
  navBox: {
    marginTop: 35,
    paddingHorizontal: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationButtonBox: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
  },
  locationsBox: {
    flex: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationButtonText: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'Abril-FatFace',
    textShadowColor: 'rgba(0, 0, 0, 0.95)',
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 2,
    marginHorizontal: 100,
    zIndex: 10,
  },
  locationActivityButtonBox: {
    flex: 1,
    flexDirection: 'row',
  },
  locationActivityButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
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
    justifyContent: 'space-between',
    backgroundColor: 'beige',
  },
  stretchLocationButton: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stretchLocationButtonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Abril-FatFace',
    textShadowColor: 'rgba(0, 0, 0, 0.95)',
    textShadowOffset: { width: -2, height: 2 },
    textShadowRadius: 2,
    zIndex: 10,
    textAlign: 'center',
  },
});
