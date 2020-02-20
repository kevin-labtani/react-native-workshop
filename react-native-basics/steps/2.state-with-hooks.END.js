import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function App() {
  const [name, setName] = useState("Kevin");
  const [job, setJob] = useState("Octocat");

  const pressHandler = () => {
    setName("Valeriya");
    setJob("WordPress Ninja");
  };

  return (
    <View style={styles.container}>
      <Text>
        My name is {name} and I am a {job}
      </Text>
      <View style={styles.buttonContainer}>
        <Button title="update name" onPress={pressHandler} />
      </View>
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
  buttonContainer: {
    marginTop: 20
  }
});
