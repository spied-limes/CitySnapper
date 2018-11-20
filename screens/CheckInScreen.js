import React from "react";
import {
  ImageBackground,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Button,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default class CheckinScreen extends React.Component {
  render() {
    const { params } = this.props.navigation.state;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <ImageBackground
            source={require("../assets/images/timesSquare.jpg")}
            style={{ width: "100%", height: 450 }}
          >
            <View style={styles.navBox}>
              <View>
                <Ionicons
                  name={
                    Platform.OS === "ios" ? `ios-arrow-back` : "md-arrow-back"
                  }
                  size={35}
                  color="white"
                />
              </View>
              <View>
                <Text style={styles.borough}>Borough</Text>
              </View>
            </View>
          </ImageBackground>
          <View style={styles.infoBox}>
            <Text>Hello Matess! </Text>
            <Text>you have checked in to {params.name}</Text>
            <Button
              title="Go back"
              onPress={() => this.props.navigation.navigate("Map")}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  locationDetailsBox: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover"
  },
  navBox: {
    marginTop: 40,
    flex: 1
  },
  borough: {
    color: "white",
    fontSize: 20
  },
  infoBox: {
    flex: 2,
    paddingTop: 15,
    backgroundColor: "blue",
    color: "white"
  },
  activityBox: {
    flex: 1
  }
});
