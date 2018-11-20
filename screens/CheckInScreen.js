import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Button
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default class CheckinScreen extends React.Component {
  render() {
    const { params } = this.props.navigation.state;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.navBox}>
            <View />
            <View>
              <Text>Borough</Text>
            </View>
          </View>
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
  navBox: {
    flex: 1
  },

  infoBox: {
    flex: 2,
    paddingTop: 15,
    backgroundColor: "blue"
  },
  activityBox: {
    flex: 1
  }
});
