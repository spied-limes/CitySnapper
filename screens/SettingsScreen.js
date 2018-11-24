import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: "app.json"
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>here only to resolve samples</Text>
      </ScrollView>
    );
  }
}
