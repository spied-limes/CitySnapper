/* eslint-disable no-use-before-define */
/* eslint-disable quotes */
/* eslint-disable react/no-deprecated */
import React from 'react';
import {
  Alert,
  Button,
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { AnimatedRegion, Animated } from 'react-native-maps';
import DropdownMenu from 'react-native-dropdown-menu';
import { Constants, Location, Permissions } from 'expo';
import CheckinScreen from './CheckInScreen';
import * as firebase from 'firebase';

import Carousel from 'react-native-looped-carousel';
import {
  updateUserCurrentLocation,
  setUserHomebaseLocation,
  setUserLocationPermissionTrue,
} from '../firebase/firebaseConfig';
import {
  watchUserData,
  watchPlaceData,
  watchActivityData,
} from '../redux/app-redux';
import { connect } from 'react-redux';

const { width, height } = Dimensions.get('window');

let navigateCoords = {
  destLat: null,
  destLong: null,
};

class MapScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.state = {
      size: { width, height },
      latitude: 40.7589,
      longitude: -73.9851,
      latitudeDelta: 0.003,
      longitudeDelta: 0.0015,
      errorMessage: null,
      text: 'Current Location',
      // for current storage
      currentLat: null,
      currentLong: null,
      permittedLocationUse: false,
    };
  }

  // This componentWillMount does the work of getInitialState() in setting up the region
  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  // async componentDidMount() {
  //   const userId = firebase.auth().currentUser
  //     ? firebase.auth().currentUser.uid
  //     : 'RichIDidItTheresABackgroundImageOnASlider';

  //   // populate props with latest redux info
  //   await this.props.watchUser();
  //   await this.props.watchPlaces();
  //   await this.props.watchActivities();

  //   // if user hasn't set homebase yet:

  //   this.props.userData &&
  //     console.log(
  //       'permittedLocationUse: ',
  //       this.props.userData.permittedLocationUse
  //     );
  //   !this.props.userData.permittedLocationUse &&
  //     Alert.alert(
  //       'Set Homebase',
  //       'Use current location as homeBase?',
  //       [
  //         {
  //           text: 'NO',
  //           onPress: () => {
  //             console.log('NO Pressed');
  //             this.setState({
  //               errorMessage: 'Permission to access location was denied',
  //             });
  //           },
  //         },
  //         {
  //           text: 'OK',
  //           onPress: async () => {
  //             this.setState({ permittedLocationUse: true });
  //             await this._getLocationAsync();
  //             await setUserHomebaseLocation(userId, {
  //               homebaseLatitude: this.state.currentLat,
  //               homebaseLongitude: this.state.currentLong,
  //             });
  //             console.log(
  //               'this.state.currentLat:',
  //               this.state.currentLat,
  //               'this.state.currentLong:',
  //               this.state.currentLong
  //             );
  //             console.log('OK Pressed');
  //           },
  //         },
  //       ],
  //       {
  //         cancelable: false,
  //       }
  //     );
  // }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});

    this.setState({
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
      currentLong: location.coords.longitude,
      currentLat: location.coords.latitude,
    });
  };

  // Both of these functions use `this.map`, a ref created INSIDE the <MapView /> component
  changeLocationAndState(regionObj) {
    navigateCoords = {
      currentLat: this.state.currentLat,
      currentLong: this.state.currentLong,
      destLat: regionObj.latitude,
      destLong: regionObj.longitude,
    };
    this.map.animateToRegion(regionObj, 750);

    console.log('navigateCoords', navigateCoords);
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

  /*
    ____                 __
   / __ \___  ____  ____/ /__  _____
  / /_/ / _ \/ __ \/ __  / _ \/ ___/
 / _, _/  __/ / / / /_/ /  __/ /
/_/ |_|\___/_/ /_/\__,_/\___/_/
*/

  render() {
    const { push, navigate } = this.props.navigation;

    const sliderCoords = [
      {
        locationName: 'Fullstack Academy',
        latitude: 40.7051,
        longitude: -74.0092,
        latitudeDelta: 0.004,
        longitudeDelta: 0.002,
      },
      {
        locationName: 'Times Square',
        latitude: 40.7589,
        longitude: -73.9851,
        latitudeDelta: 0.004,
        longitudeDelta: 0.002,
      },
      {
        locationName: 'World Trade Center',
        latitude: 40.7118,
        longitude: -74.0131,
        latitudeDelta: 0.004,
        longitudeDelta: 0.002,
      },
      {
        locationName: 'Empire State Building',
        latitude: 40.7484,
        longitude: -73.9856,
        latitudeDelta: 0.004,
        longitudeDelta: 0.002,
      },
      {
        locationName: 'Metropolitan Museum of Art',
        latitude: 40.7794,
        longitude: -73.9632,
        latitudeDelta: 0.004,
        longitudeDelta: 0.002,
      },
    ];

    return (
      <View style={styles.container}>
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
            ref={ref => {
              this.map = ref;
            }}
            region={{
              // This is hardcoded in the snapping dropdown version
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.00155,
            }}
            showsUserLocation={true}
            style={styles.map}
          >
            {sliderCoords.map(coordinate => (
              <MapView.Marker
                key={`${coordinate.locationName}`}
                coordinate={{
                  latitude: coordinate.latitude,
                  longitude: coordinate.longitude,
                }}
              />
            ))}
          </MapView>
        </View>
        {/*
    __  ___           _____ ___     __
   /  |/  /___ _____ / ___// (_)___/ /__  _____
  / /|_/ / __ `/ __ \\__ \/ / / __  / _ \/ ___/
 / /  / / /_/ / /_/ /__/ / / / /_/ /  __/ /
/_/  /_/\__,_/ .___/____/_/_/\__,_/\___/_/
            /_/
          */}
        <View style={styles.locationsBox} onLayout={this._onLayoutDidChange}>
          <Carousel
            ref={ref => (this.carousel = ref)}
            style={this.state.size}
            leftArrowText={'＜'}
            leftArrowStyle={{ color: 'white', fontSize: 30, marginLeft: 20 }}
            rightArrowText={'＞'}
            rightArrowStyle={{ color: 'white', fontSize: 30, marginRight: 20 }}
            arrows
            autoplay={false}
            currentPage={0}
            onAnimateNextPage={slideIdx => {
              const nextRegion = {
                latitude: sliderCoords[slideIdx].latitude,
                longitude: sliderCoords[slideIdx].longitude,
                latitudeDelta: sliderCoords[slideIdx].latitudeDelta,
                longitudeDelta: sliderCoords[slideIdx].longitudeDelta,
              };
              const locationName = sliderCoords[slideIdx].locationName;

              this.changeLocationAndState(nextRegion, locationName);
            }}
          >
            {/*
    __                     __  _            _____ ___     __
   / /   ____  _________ _/ /_(_)___  ____ / ___// (_)___/ /__  __________
  / /   / __ \/ ___/ __ `/ __/ / __ \/ __ \\__ \/ / / __  / _ \/ ___/ ___/
 / /___/ /_/ / /__/ /_/ / /_/ / /_/ / / / /__/ / / / /_/ /  __/ /  (__  )
/_____/\____/\___/\__,_/\__/_/\____/_/ /_/____/_/_/\__,_/\___/_/  /____/

          */}
            {/*
    ______      ____     __             __
   / ____/_  __/ / /____/ /_____ ______/ /__
  / /_  / / / / / / ___/ __/ __ `/ ___/ //_/
 / __/ / /_/ / / (__  ) /_/ /_/ / /__/ ,<
/_/    \__,_/_/_/____/\__/\__,_/\___/_/|_|

           */}
            <View style={[styles.locationButtonBox, this.state.size]}>
              <ImageBackground
                source={require('../assets/images/FSA.jpg')}
                style={styles.overlayImage}
              >
                <View style={styles.bgColorOverlay}>
                  <View style={styles.stretchLocationButton}>
                    <Text style={styles.locationButtonText}>
                      Fullstack Academy
                    </Text>
                  </View>
                </View>
              </ImageBackground>
            </View>

            {/*
  _______                     _____
 /_  __(_)___ ___  ___  _____/ ___/____ ___  ______ _________
  / / / / __ `__ \/ _ \/ ___/\__ \/ __ `/ / / / __ `/ ___/ _ \
 / / / / / / / / /  __(__  )___/ / /_/ / /_/ / /_/ / /  /  __/
/_/ /_/_/ /_/ /_/\___/____//____/\__, /\__,_/\__,_/_/   \___/
                                   /_/
            */}
            <View style={[styles.locationButtonBox, this.state.size]}>
              <ImageBackground
                source={require('../assets/images/timesSquare.jpg')}
                style={styles.overlayImage}
              >
                <View style={styles.bgColorOverlay}>
                  <View style={styles.stretchLocationButton}>
                    <Text
                      style={[
                        styles.locationButtonText,
                        { marginTop: 50, paddingTop: 15 },
                      ]}
                    >
                      Times Square
                    </Text>
                  </View>
                  <View style={styles.locationActivityButtonBox}>
                    <TouchableOpacity
                      style={styles.locationActivityButton}
                      onPress={() =>
                        this.props.navigation.navigate('CheckIn', {
                          location: 'Times Square',
                        })
                      }
                    >
                      <Text style={styles.stretchLocationButtonText}>
                        View Activities
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.locationActivityButton}
                      onPress={() =>
                        this.props.navigation.navigate(
                          'Directions',
                          navigateCoords
                        )
                      }
                    >
                      <Text style={styles.stretchLocationButtonText}>
                        Navigate Here
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ImageBackground>
            </View>

            {/*
 _       __           __    ________               __
| |     / /___  _____/ /___/ /_  __/________ _____/ /__
| | /| / / __ \/ ___/ / __  / / / / ___/ __ `/ __  / _ \
| |/ |/ / /_/ / /  / / /_/ / / / / /  / /_/ / /_/ /  __/
|__/|__/\____/_/  /_/\__,_/ /_/ /_/   \__,_/\__,_/\___/

            */}
            <View style={[styles.locationButtonBox, this.state.size]}>
              <ImageBackground
                source={require('../assets/images/WTC.jpg')}
                style={styles.overlayImage}
              >
                <View style={styles.bgColorOverlay}>
                  <View style={styles.stretchLocationButton}>
                    <Text
                      style={[
                        styles.locationButtonText,
                        { marginTop: 50, paddingTop: 15 },
                      ]}
                    >
                      World Trade Center
                    </Text>
                  </View>
                  <View style={styles.locationActivityButtonBox}>
                    <TouchableOpacity
                      style={styles.locationActivityButton}
                      onPress={() =>
                        this.props.navigation.navigate('CheckIn', {
                          location: 'Times Square',
                        })
                      }
                    >
                      <Text style={styles.stretchLocationButtonText}>
                        View Activities
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.locationActivityButton}
                      onPress={() =>
                        this.props.navigation.navigate(
                          'Directions',
                          navigateCoords
                        )
                      }
                    >
                      <Text style={styles.stretchLocationButtonText}>
                        Navigate Here
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ImageBackground>
            </View>

            {/*
    ______                _          _____ __        __
   / ____/___ ___  ____  (_)_______ / ___// /_____ _/ /____
  / __/ / __ `__ \/ __ \/ / ___/ _ \\__ \/ __/ __ `/ __/ _ \
 / /___/ / / / / / /_/ / / /  /  __/__/ / /_/ /_/ / /_/  __/
/_____/_/ /_/ /_/ .___/_/_/   \___/____/\__/\__,_/\__/\___/
               /_/
            */}
            <View style={[styles.locationButtonBox, this.state.size]}>
              <ImageBackground
                source={require('../assets/images/ESB.jpg')}
                style={styles.overlayImage}
              >
                <View style={styles.bgColorOverlay}>
                  <View style={styles.stretchLocationButton}>
                    <Text
                      style={[
                        styles.locationButtonText,
                        { marginTop: 50, paddingTop: 0 },
                      ]}
                    >
                      Empire State Building
                    </Text>
                  </View>
                  <View style={styles.locationActivityButtonBox}>
                    <TouchableOpacity
                      style={styles.locationActivityButton}
                      onPress={() =>
                        this.props.navigation.navigate('CheckIn', {
                          location: 'empireStateBuilding',
                        })
                      }
                    >
                      <Text style={styles.stretchLocationButtonText}>
                        View Activities
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.locationActivityButton}
                      onPress={() =>
                        this.props.navigation.navigate(
                          'Directions',
                          navigateCoords
                        )
                      }
                    >
                      <Text style={styles.stretchLocationButtonText}>
                        Navigate Here
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ImageBackground>
            </View>

            {/*
  ________         __  ___     __
 /_  __/ /_  ___  /  |/  /__  / /_
  / / / __ \/ _ \/ /|_/ / _ \/ __/
 / / / / / /  __/ /  / /  __/ /_
/_/ /_/ /_/\___/_/  /_/\___/\__/
            */}
            <View style={[styles.locationButtonBox, this.state.size]}>
              <ImageBackground
                source={require('../assets/images/TheMet.jpg')}
                style={styles.overlayImage}
              >
                <View style={styles.bgColorOverlay}>
                  <View style={styles.stretchLocationButton}>
                    <Text
                      style={[
                        styles.locationButtonText,
                        { marginTop: 50, paddingTop: 15 },
                      ]}
                    >
                      Metropolitan Museum of Art
                    </Text>
                  </View>
                  <View style={styles.locationActivityButtonBox}>
                    <TouchableOpacity
                      style={styles.locationActivityButton}
                      onPress={() =>
                        this.props.navigation.navigate('CheckIn', {
                          location: 'empireStateBuilding',
                        })
                      }
                    >
                      <Text style={styles.stretchLocationButtonText}>
                        View Activities
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.locationActivityButton}
                      onPress={() =>
                        this.props.navigation.navigate(
                          'Directions',
                          navigateCoords
                        )
                      }
                    >
                      <Text style={styles.stretchLocationButtonText}>
                        Navigate Here
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ImageBackground>
            </View>
          </Carousel>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.userData,
    activities: state.activities,
    places: state.places,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    watchUser: () => dispatch(watchUserData()),
    watchActivities: () => dispatch(watchActivityData()),
    watchPlaces: () => dispatch(watchPlaceData()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 27,
    backgroundColor: '#fff',
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
  },
  mapFlexContainer: {
    flex: 65,
  },
  locationsBox: {
    flex: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgColorOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.35)',
  },
  locationButtonBox: {
    flex: 1,
    alignItems: 'stretch',
  },
  overlayImage: {
    width: '100%',
    height: height * 0.35,
    resizeMode: 'cover',
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
  },
  LocationsHeadline: {
    color: 'white',
    flex: 1,
    fontSize: 24,
    fontFamily: 'Abril-FatFace',
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
});
