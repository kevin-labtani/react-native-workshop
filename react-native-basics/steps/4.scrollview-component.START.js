import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

export default function App() {
  const [items, setItems] = useState([
    { name: "apple", id: "1" },
    { name: "desk", id: "2" },
    { name: "tomato", id: "3" },
    { name: "computer", id: "4" },
    { name: "coffee", id: "5" },
    { name: "projector", id: "6" },
    { name: "bag", id: "7" }
  ]);

  return (
  <View style={styles.container}></View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    paddingTop: 40,
    paddingHorizontal: 20
  }
});
