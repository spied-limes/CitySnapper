/* eslint-disable react/no-deprecated */
import React from 'react';
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
  Alert,
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker, AnimatedRegion, Animated } from 'react-native-maps';
import DropdownMenu from 'react-native-dropdown-menu';
import { Constants, Location, Permissions } from 'expo';
import CheckinScreen from './CheckInScreen';
import { updateUserCurrentLocation } from '../firebase/firebaseConfig';
import * as firebase from 'firebase';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.state = {
      latitude: 40.7589,
      longitude: -73.9851,
      latitudeDelta: 0.003,
      longitudeDelta: 0.0015,
      errorMessage: null,
      text: 'Current Location',
      // for current storage
      currentLat: null,
      currentLong: null,
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

  componentDidMount() {
    const userId = firebase.auth().currentUser.uid;

    console.log('permittedLocationUse: ', this.state.permittedLocationUse);
    !this.state.permittedLocationUse &&
      Alert.alert(
        'Set Homebase',
        'Use current location as homeBase?',
        [
          {
            text: 'NO',
            onPress: () => {
              console.log('NO Pressed');
              this.setState({
                errorMessage: 'Permission to access location was denied',
              });
            },
          },
          {
            text: 'OK',
            onPress: async () => {
              this.setState({ permittedLocationUse: true });
              await this._getLocationAsync();
              await updateUserCurrentLocation(userId, {
                currentLatitude: this.state.currentLat,
                currentLongitude: this.state.currentLong,
              });
              console.log(
                'this.state.currentLat: ',
                this.state.currentLat,
                'this.state.currentLong: ',
                this.state.currentLong
              );
              console.log('OK Pressed');
            },
          },
        ],
        {
          cancelable: false,
        }
      );
  }

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

  render() {
    const { push, navigate } = this.props.navigation;

    // DROPDOWN DATA
    const data = [
      [
        'Current Location',
        'Times Square',
        'Fullstack Academy',
        'World Trade Center',
        'Museum of Sex',
      ],
    ]; //will have to be data
    const coordinates = [
      { latitude: this.state.currentLat, longitude: this.state.currentLong },
      {
        //times square
        latitude: 40.7589,
        longitude: -73.9851,
        latitudeDelta: 0.003,
        longitudeDelta: 0.0015,
      },
      {
        latitude: 40.7051,
        longitude: -74.0092,
        latitudeDelta: 0.003,
        longitudeDelta: 0.0015,
      },
      {
        latitude: 40.7118,
        longitude: -74.0131,
        latitudeDelta: 0.003,
        longitudeDelta: 0.0015,
      },
      {
        latitude: 40.7441,
        longitude: -73.9874,
        latitudeDelta: 0.003,
        longitudeDelta: 0.0015,
      },
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
              bgColor={'white'}
              tintColor={'#000000'}
              optionTextStyle={{ color: 'red' }}
              activityTintColor={'green'} // checkImage={} // arrowImg={}
              titleStyle={{ color: '#333333' }}
              // maxHeight={300}
              handler={(selection, row) =>
                this.setState({
                  text: data[selection][row],
                  latitude: coordinates[row].latitude,
                  longitude: coordinates[row].longitude,
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
                onPress={() => navigate('Screen', { name: this.state.text })}
                title="Check In"
                color="#841584"
              />
            ) : (
              <Button
                style={{ flex: 1, alignItems: 'center' }}
                onPress={() =>
                  navigate('Directions', {
                    destLat: this.state.latitude,
                    destLong: this.state.longitude,
                    currentLong: this.state.currentLong,
                    currentLat: this.state.currentLat,
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
              latitudeDelta: 0.005,
              longitudeDelta: 0.00155,
            }}
            showsUserLocation={true}
            style={styles.map}
          >
            <Marker
              coordinate={{ latitude: 40.6, longitude: -74 }}
              title={'first marker'}
              description={'jkh'}
              onPress={() =>
                this.state.latitude === 40.6 && longitude === -74
                  ? console.log('success')
                  : console.log('failure')
              }
            />
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
    backgroundColor: '#fff',
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 25,
  },
  mapFlexContainer: {
    flex: 4,
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
  },
  mapCommentContainer: {
    flex: 2,
    padding: 15,
    backgroundColor: 'beige',
    zIndex: 10,
  },
  mapComment: {
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
    color: 'white',
  },
});
