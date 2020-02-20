import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const [name, setName] = useState("Kevin");
  const [job, setJob] = useState("Octocat");

  return (
    <View style={styles.container}>
      <Text>
        My name is {name} and I am a {job}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center"
  }
});
