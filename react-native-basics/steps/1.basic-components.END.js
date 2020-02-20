import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.boldText}>
          Hello World, I'm <Text style={styles.name}>Kevin</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    backgroundColor: "purple",
    padding: 20
  },
  boldText: {
    fontWeight: "bold",
    color: "white"
  },
  name: {
    color: "pink"
  }
});
