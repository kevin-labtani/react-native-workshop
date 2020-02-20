import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

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
    <View style={styles.container}>
      <ScrollView>
        {items.map(item => {
          return (
            <View key={item.id}>
              <Text style={styles.item}>{item.name}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    paddingTop: 40,
    paddingHorizontal: 20
  },
  item: {
    padding: 25,
    marginVertical: 12,
    backgroundColor: "lightsteelblue",
    borderColor: "black",
    borderWidth: 1,
    fontSize: 24
  }
});
