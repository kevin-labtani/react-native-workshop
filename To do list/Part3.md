## Table of Contents

- [Before the Workshop](../README.md/#Before-the-Workshop)
- [Getting Started](../README.md/#Getting-Started)
- [What is React Native?](../README.md/#What-is-React-Native)
- [React Native Basics](../README.md//#React-Native-Basics)
- [Debugging React Native Apps](../README.md//#Debugging-React-Native-Apps)
- [Todo List App part 1](Readme.md)
- [Todo List App part 2](Part2.md)
- [Todo List App part 3](Part3.md)
- [Todo List App part 4](Part4.md)
## Part - 3

In this part, you will create an input to add new todos in the TodoList.

### 3.1

In "components" folder create a new file "addToDo.js" and copy-paste the folowing code at the top of the file.

```js
import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";
```

Here we need to use state hook {useState}, because we will keep track what the user is typing in the input.

Now we create a component `< AddToDO />` using default export. It returns `<View>` and inside it `<TextInput />` components.

```js
export default function AddToDo() {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="new todo..."
        onChangeText={changeHandler}
        value={text}
      />
    </View>
  );
}
```

onChangeText prop will track what the user type in the input.
Now you should create a state hook above the return to track the input. Its default value is an empty string.

```js
const [text, setText] = useState("");
```

Then you write a function "changeHandler" below the state hook.

```js
const changeHandler = value => {
  setText(value);
};
```

So when the user is typing in the input, the prop `onChangeText` will call the function `changeHandler` with one parameter `value` that is equal to the input, and this function will change the `text` props in the state.
In `<TextInput />` component this `onChangeText={changeHandler}` is the same thing that `onChangeText={(value) changeHandler(value)}`.

Now style your input using styles variable:

```js
const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd"
  }
});
```

At last go to the App.js and import new component:

```js
import AddToDo from "./components/addToDo";
```

and replace the comment `{/* to form */}` with that component `< AddToDo />`.

### 3.2

Now return to the addToDo.js file and add a `<Button />` component below `<TextInput />`.

```js
<Button onPress={pressHandler} title="add todo" color="purple" />
```

The button has title and color props. Also you can see `onPress` event, so when you will press that button the `pressHandler` function will be called. So let's create this function, write it above the `changeHandler` function.

```js
const pressHandler = () => {
  submitHandler(text);
  setText("");
};
```

It calls the `submitHandler` function that has just one parameter - the text of the input from the state. This function we have to create in the App.js, because we want to add a new todo in the existing array of todos. After calling that function, `pressHandler` will set the text state to an empty string to clean the input.

### 3.3

Open the App.js file and create the `submitHandler` function above `pressHandler` function.

```js
const submitHandler = text => {
  setTodos(prevTodos => {
    return [{ text: text, key: Math.random().toString() }, ...prevTodos];
  });
};
```

This function gets new todo(text) and updates useState with the ToDoList. It returns a new array with all previous todos and the new item as well. For a new todo you need to set text prop that is equal to text parametre and the key prop. The key should be unique, so for this example, we will use `Math.random()`, but it's not a good practice, so we will change it later.

Now pass `submitHundler` as a prop in `<AddToDo />` component to call it from the button of addToDo.js.

```js
<AddToDo submitHandler={submitHandler} />
```

And the final thing - in the addToDo.js pass `{submitHandler}` as a prop for the function AddToDo.

### 3.4

After making this part you should have the following code in the addToDo.js:

```js
import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";

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
      <Button onPress={pressHandler} title="add todo" color="purple" />
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
```

and in the App.js:

```js
import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Header from "./components/header";
import TodoItem from "./components/todoItem";
import AddToDo from "./components/addToDo";

export default function App() {
  const [todos, setTodos] = useState([
    { text: "Create a react native app", key: "1" },
    { text: "Dont worry", key: "2" },
    { text: "Be happy", key: "3" }
  ]);

  const pressHandler = key => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.key != key);
    });
  };

  const submitHandler = text => {
    setTodos(prevTodos => {
      return [{ text: text, key: Math.random().toString() }, ...prevTodos];
    });
  };
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <AddToDo submitHandler={submitHandler} />
        <View style={styles.list}>
          <FlatList
            data={todos}
            renderItem={({ item }) => (
              <TodoItem item={item} pressHandler={pressHandler} />
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  content: {
    padding: 40
  },
  list: {
    marginTop: 20
  }
});
```

[The part - 4](Part4.md) is waiting for you now!
