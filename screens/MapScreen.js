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

import { createStackNavigator } from "react-navigation";
import MapView, { Marker, AnimatedRegion, Animated } from "react-native-maps";
import DropdownMenu from "react-native-dropdown-menu";
import { Constants, Location, Permissions } from "expo";
import CheckinScreen from "./CheckInScreen";

const CheckIn = createStackNavigator({
  CheckinScreen: CheckinScreen
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
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      errorMessage: null,
      text: "Dropdown on auto-locate map screen."
    };
  }

  // This componentWillMount does the work of getInitial state
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
    console.log(location);
    this.setState({
      longitude: location.coords.longitude,
      latitude: location.coords.latitude
    });
  };

  render() {
    const { navigate } = this.props.navigation;

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
        longitude: -73.9851,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      {
        latitude: 40.7051,
        longitude: -74.0092,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      {
        latitude: 40.7118,
        longitude: -74.0131,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      {
        latitude: 40.7441,
        longitude: -73.9874,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    ];

    return (
      <View style={styles.container}>
        <MapView
          region={{
            // This is hardcoded in the snapping dropdown version
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.122,
            longitudeDelta: 0.121
          }}
          showsUserLocation={true}
          style={styles.map}
        >
          <Marker
            coordinate={{ latitude: 40.6, longitude: -74 }}
            title={"first marker"}
            description={"jkh"}
            onPress={() =>
              this.state.latitude === 40.6 && longitude === -74
                ? console.log("success")
                : console.log("failure")
            }
          />
        </MapView>
        <View style={styles.tabBarInfoContainer}>
          <View style={styles.mapCommentContainer}>
            <Text style={styles.mapComment}>✔ Smooth map movement</Text>
            <Text style={styles.mapComment}>✔ Snap to dropdown location </Text>
          </View>

          {this.state.latitude && this.state.longitude ? (
            <Button
              style={{ flex: 1 }}
              onPress={() => navigate("CheckIn")}
              title="Check In"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
            />
          ) : (
            <Text> Nah you can't check in</Text>
          )}
          <DropdownMenu
            style={{ flex: 1 }}
            bgColor={"white"}
            tintColor={"#000000"}
            optionTextStyle={{ color: "red" }}
            activityTintColor={"green"} // checkImage={} // arrowImg={}
            // titleStyle={{color: '#333333'}}
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
            <View style={{ flex: 1 }}>
              <Text>{this.state.text} is current location</Text>
              <Text>Lat: {this.state.latitude}</Text>
              <Text>Long: {this.state.longitude}</Text>
            </View>
          </DropdownMenu>
          {/* <Text style={styles.tabBarInfoText}>
            CurrentLatitude: {this.state.latitude}
          </Text>
          <Text style={styles.tabBarInfoText}>
            CurrentLongitude: {this.state.longitude}
          </Text> */}

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
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute"
  },
  mapCommentContainer: {
    padding: 15
  },
  mapComment: {
    fontSize: 18,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
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
