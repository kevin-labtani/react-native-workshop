## Table of Contents

- [Before the Workshop](#Before-the-Workshop)
- [Getting Started](#Getting-Started)
- [What is React Native?](#What-is-React-Native?)
- [React Native Basics](#React-Native-Basics)
- [Debugging React Native Apps](#Debugging-React-Native-Apps)
- [Todo List App part 1](./To%20do%20list/Readme.md)
- [Todo List App part 2](./To%20do%20list/Part2.md)
- [Todo List App part 3](./To%20do%20list/Part3.md)
- [Todo List App part 4](./To%20do%20list/Part4.md)

## Part - 4

In this part, we will improve the todo app.

### 4.1

First of all, you will add some validation to the app.
If the input text is less than 3 characters, the app will send an alert to the user.

To do it use `submitHandler` function in App.js. You need to add `if else condition` to check the number of characters. If it's more than 3 chars, it will add the new todos in the list, if not send an alert. To use the `Alert` component you must import it from React-Native, besides you can delete the `<Text>` component from import as we don't use it anymore.

```js
import { StyleSheet, Alert, View, FlatList } from "react-native";
```

Our function now looks like this:

```js
const submitHandler = text => {
  if (text.length > 3) {
    setTodos(prevTodos => {
      return [{ text: text, key: Math.random().toString() }, ...prevTodos];
    });
  } else {
    Alert.alert("OOPS!", "Todos must be over 3 chars long", [{ text: "OK" }]);
  }
};
```

It takes 3 arguments: 1. Title of the alert (OOPs!); 2. Some kind of message (Todos must be over 3 chars long); 3. an array with objects that can represent buttons. In our case we have just one button(OK).

### 4.2

Now you need to dismiss the keyboard, because it's always open, and we want to be able to close it touching anywhere on the screen.

To do that to wrap the whole application in a new component `<TouchableWithoutFeedback>` component. Also, you need to use the `<Keyboard>` component to dismiss the keyboard.
So in App.js import these components

```js
import {
  StyleSheet,
  Alert,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
```

Wrap all components in the `<TouchableWithoutFeedback>` component.

```js
return (
  <TouchableWithoutFeedback>
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
  </TouchableWithoutFeedback>
);
```

and create an `onPress` handler that will dismiss the keyboard.

```js
<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
```

So now when you touch anywhere on the screen, `onPress` will call the dismiss method and close the keyboard.

### 4.3

It's time to fix a small problem with the `<FlatList>` component, because if you now add a lot of todos you'll notice that you can't see the last todos, as it's out of the screen bottom. It happens because the `<FlatList>` is pushed by `<TextInput>` down.
It's very simple to fix, you just need to add `flex: 1` to the `styles.content` and `styles.list` in App.js. It means, that the components take just all available space, and they can't go out of the screen.

```js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  content: {
    flex: 1,
    padding: 40
  },
  list: {
    flex: 1,
    marginTop: 20
  }
});
```

### 4.4

Now you will add an icon to the left of each todos.
To know more about icons in expo [read official docs](https://docs.expo.io/versions/latest/guides/icons/). But, in brief, when we use `expo -init` icons are already a part of the library so we don't need to install anything extra. You need just to[choose](https://expo.github.io/vector-icons/) an icon and import it in your project.

To import icons open todoItem.js and copy-paste the folowing code:

```js
import { Feather } from "@expo/vector-icons";
```

`{ Feather }` is the source of the icon.

Now create a new `<Feather>` component inside of the `<TouchableOpacity>` component before the `<Text>` component. It has props: name, it's the name of the icon we're using; size and color of the icon.

```js
<TouchableOpacity style={styles.item} onPress={() => pressHandler(item.key)}>
  <Feather name="delete" size={18} color="#333" />
  <Text style={styles.text}>{item.text}</Text>
</TouchableOpacity>
```

Just one thing left - style the components a bit more. To make the icon be on the left of the text, add `flexDirection: 'row'` to the `styles.item`. Then create `style={styles.text}` and pass `marginLeft: 10` in it. Now we have a space between the icon and the todos.

```js
const styles = StyleSheet.create({
  item: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.26,
    backgroundColor: "white",
    elevation: 8,
    padding: 20,
    margin: 7,
    borderRadius: 10,
    flexDirection: "row"
  },
  text: {
    marginLeft: 10
  }
});
```

### 4.5

So we have already done almost all the work, but still have a couple of things to do.
Now we will use custom fonts in our app.

In the assets folder create a new folder "fonts".
We will use [open sans font](https://fonts.google.com/specimen/Open+Sans) from Google Fonts, but you can use any font that you like. You just need to download the font and copy-past all "ttf" files from it to `assets/fonts`.

Then in the App.js import fonts from the folder.

```js
import * as Fonts from "expo-font";
```

The symbol `*` means all files, and 'expo-font' is a package that gives you fonts, and it should be included by default, but run `expo install expo-font`to be sure.

Then we create a function, that loads the fonts.

```js
const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-italic": require("./assets/fonts/OpenSans-Italic.ttf")
  });
};
```

It returns an object with our fonts, where we write the name of the font and, using `require`, you show the path to the chosen font.
This function returns a promise, so it can't be loaded immediately. In this situation you have to use a special component `< AppLoading >` from 'expo', so import it in App.js. It will prolong the loading screen time until the fonts load.

```js
import { AppLoading } from "expo";
```

To make this component works you can use state.

```js
const [dataLoaded, setDataLoaded] = useState(false);
```

You write it below the todolist array in the `App function`.
Then we write a function that will check the state of dataLoaded(fonts) and if it's false, it will return an `< AppLoading >` component.

```js
const [dataLoaded, setDataLoaded] = useState(false);

if (!dataLoaded) {
  return (
    <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setDataLoaded(true)}
      onError={err => console.log(err)}
    />
  );
}
```

This function has the following props:

1. `startAsync` that is our loading fonts function.
2. `onFinish` when the fonts are loaded, it changes state of dataLoaded as `true` and all app will be loaded.
3. `onError` if we have an error, it will show it in the connsole.

How to apply the fonts?
Just write this line of code to the style prop of the component when you want to change the font.

```js
fontFamily: "name of the font";
```

so now we have in header.js

```js
const styles = StyleSheet.create({
  header: {
    height: 80,
    backgroundColor: "#800080",
    paddingTop: 40
  },
  title: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "open-sans"
  }
});
```

and in todoItems.js

```js
const styles = StyleSheet.create({
  item: {
    shadowColor: "black",
    shadowOffset: { width: 0, heigth: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.26,
    backgroundColor: "white",
    elevation: 8,
    padding: 20,
    margin: 7,
    borderRadius: 10,
    flexDirection: "row"
  },
  text: {
    marginLeft: 10,
    fontFamily: "open-sans"
  }
});
```

### 4.6

The default button from React Native is kind of boring, so let's build our own!
Create a new `button.js` file in the components folder; we're going to need the `StyleSheet`, `TouchableOpacity`, `Text` and `View` basic components from react native, so let's import them!

```js
import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
```

Our custom button is basically a `Text` component wrapped in a `View` component for styling purpose, itself wrapped in a `TouchableOpacity` component so we get feedback on touch.

We'll pass as a props an `onPress` callback function that's executed when we press on the button and a `title` we use in order to set the text on the button

```js
export default function FlatButton({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}
```

Let's now style this button:

```js
const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "purple"
  },
  buttonTitle: {
    color: "white",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center"
  }
});
```

That's it, our `FlatButton` component is all done! We'll now import it in our addToDo component and replace the default `Button` with it:

```js
import FlatButton from "./button";
...
<FlatButton onPress={pressHandler} title="add todo" />
  {/* replace <Button onPress={pressHandler} title="add todo" color="purple" /> */}
```
