import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import MapView, { AnimatedRegion, Animated } from "react-native-maps";
import DropdownMenu from "react-native-dropdown-menu";
import { WebBrowser } from "expo";

import { MonoText } from "../components/StyledText";

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "",
      longitude: 40.6,
      latitude: -74,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    };
    this.menuLocation = this.menuLocation.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
  }
  static navigationOptions = {
    header: null
  };

  getInitialState() {
    return {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    };
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  menuLocation(selection, row, data, coordinates) {
    this.setState({
      text: data[selection][row],
      region: {
        latitude: coordinates[row].latitude,
        longitude: coordinates[row].longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    });
  }

  render() {
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
          initialRegion={{
            latitude: 40.7128,
            longitude: -74.006,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          style={
            styles.map //find current location and use this
          }
          region={this.state.region}
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
            bgColor={"white"}
            tintColor={"#666666"}
            activityTintColor={"green"} // arrowImg={}
            // checkImage={}
            // optionTextStyle={{color: '#333333'}}
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
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
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
    backgroundColor: "#fbfbfb",
    paddingVertical: 100
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
