import React, { useState } from "react";
import { StyleSheet, Text, TextInput, Button, View } from "react-native";
import FlatButton from "./button";

export default function AddToDo({ submitHandler }) {
  const [text, setText] = useState("");

  const changeHandler = value => {
    setText(value);
  };

  const pressHandler = () => {
    submitHandler(text);
    setText("");
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="new todo..."
        onChangeText={changeHandler}
        value={text}
      />
      <FlatButton onPress={pressHandler} title="add todo" />
      {/* <Button onPress={pressHandler} title="add todo" color="purple" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd"
  }
});
