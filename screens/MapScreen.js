import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
<<<<<<< HEAD
  Button,
  TextInput,
} from 'react-native';

import { createStackNavigator } from 'react-navigation';
import MapView, { Marker } from 'react-native-maps';
import { WebBrowser, Constants, Location, Permissions } from 'expo';
import { MonoText } from '../components/StyledText';
// import CheckinScreen from './CheckInScreen';

// const CheckIn = createStackNavigator({
//   CheckinScreen: CheckinScreen,
// });

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor() {
    super();
    this.state = {
      longitude: 40.6,
      latitude: -74,
      errorMessage: null,
      text: 'This is a map screen',
    };
  }

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

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    this.setState({
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
    });
  };

  render() {
    const { navigate } = this.props.navigation;
=======
} from 'react-native';
import MapView, { AnimatedRegion, Animated } from 'react-native-maps';
import DropdownMenu from 'react-native-dropdown-menu';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      longitude: 40.6,
      latitude: -74,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  }
  static navigationOptions = {
    header: null,
  };

  getInitialState() {
    return {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }

  // onRegionChange(region) {
  //   this.setState({ region });
  // }

  render() {
    const data = [
      [
        'Times Square',
        'Fullstack Academy',
        'World Trade Center',
        'Museum of Sex',
      ],
    ]; //will have to be data
    const coordinates = [
      {
        latitude: 40.7589,
        longitude: -73.9851,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      {
        latitude: 40.7051,
        longitude: -74.0092,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      {
        latitude: 40.7118,
        longitude: -74.0131,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      {
        latitude: 40.7441,
        longitude: -73.9874,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    ];
>>>>>>> a84e3e64605b0286fe54602bdf151641b898607a

    return (
      <View style={styles.container}>
        <MapView
<<<<<<< HEAD
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.122,
            longitudeDelta: 0.121,
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
        <View style={styles.tabBarInfoContainer}>
          {this.state.latitude && this.state.longitude ? (
            <Button
              onPress={() => /*navigate('CheckIn')*/ alert('Checked In!')}
              title="Check In"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
          ) : (
            <Text> Nah you can't check in</Text>
          )}
          <Text style={styles.tabBarInfoText}>
            CurrentLatitude:{this.state.latitude}{' '}
          </Text>
          <Text style={styles.tabBarInfoText}>
            CurrentLongitude:{this.state.longitude}{' '}
          </Text>
          {/* <Button
            title="Check IN"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          /> */}
          {/* <TextInput
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          /> */}
          <View
            style={[styles.codeHighlightContainer, styles.navigationFilename]}
          />
=======
          initialRegion={{
            latitude: 40.7128,
            longitude: -74.006,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }} //find current location and use this
          style={styles.map}
          onRegionChange={this.onRegionChange}
        />
        {/* <MapView
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        /> */}
        {/* <Animated
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        /> */}
        <View style={styles.tabBarInfoContainer}>
          <View style={{ height: 2 }} />
          <DropdownMenu
            style={{ flex: 1 }}
            bgColor={'white'}
            tintColor={'#666666'}
            activityTintColor={'green'}
            // arrowImg={}
            // checkImage={}
            // optionTextStyle={{color: '#333333'}}
            // titleStyle={{color: '#333333'}}
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
            <View style={{ flex: 1 }}>
              <Text>{this.state.text} is current location</Text>
              <Text>Lat: {this.state.latitude}</Text>
              <Text>Long: {this.state.longitude}</Text>
            </View>
          </DropdownMenu>
>>>>>>> a84e3e64605b0286fe54602bdf151641b898607a
        </View>
      </View>
    );
  }
<<<<<<< HEAD

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use
          useful development tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/development-mode'
    );
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
=======
>>>>>>> a84e3e64605b0286fe54602bdf151641b898607a
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
<<<<<<< HEAD
    paddingVertical: 50,
=======
    paddingVertical: 100,
>>>>>>> a84e3e64605b0286fe54602bdf151641b898607a
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
