import React from "react";
import { Text, View, ScrollView, StyleSheet, Button } from "react-native";
import { ExpoLinksView } from "@expo/samples";

export default class CheckinScreen extends React.Component {
  render() {
    const { params } = this.props.navigation.state;

    return (
      <ScrollView style={styles.container}>
        <Text>Hello Matess! </Text>
        <Text>you have checked in to {params.name}</Text>
        <Button
          title="Go back"
          onPress={() => this.props.navigation.navigate("Map")}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
