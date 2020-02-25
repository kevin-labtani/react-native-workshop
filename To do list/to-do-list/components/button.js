import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

export default function RoundedButton({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "purple"
  },
  buttonTitle: {
    color: "white",
    fontFamily: "open-sans",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center"
  }
});