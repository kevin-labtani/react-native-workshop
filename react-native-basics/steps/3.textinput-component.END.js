import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

export default function App() {
  const [name, setName] = useState("Kevin");
  const [job, setJob] = useState("Octocat");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Please enter a name"
        onChangeText={newName => setName(newName)}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Please enter a job"
        onChangeText={newJob => setJob(newJob)}
      />
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
  },
  textInput: {
    width: "70%",
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10
  }
});
