# ToDo App

So now you are ready to create your first React Native Application!

## Part - 1.

### 1.1

To create this project you can use the expo app on your phone or Android Studio on your PC. Choose what you like more.

First of all, you need to initialize your project:

```
expo init to-do-list 
cd to-do-list
expo start
```

Then open App.js file and import { useState } from React and {  StyleSheet, Text, View, FlatList } from React Native.
Delete everything that you see in the return of the function App, just keep the first View with the style prop {styles.container}.

### 1.2

In this View write a comment "Header", this is the place for our future header of the app.
After the comment create another View component with the style {styles.content}. Inside this write a comment "to form" (this is the place for a form), and then create a new View with style {styles.list}. Now inside this View you will create a list of your todos. But before you have to import  { FlatList } from React Native. 
Now you can create < FlatList /> component with props :

```js
data = {todos} 
renderItem={({item}) => (
  <Text>{item.text}</Text>
)}
```
to use data props just copy this array with objects, where every object represents one todo. Each object has its text and key properties, and paste it before the return of Function App.

```js
  const [todos, setTodos] = useState([
    {text: 'Create an react native app', key: '1'},
    {text: 'Dont worry', key: '2'},
    {text: 'Be happy', key: '3'}
  ])
```

Now you will style the components, so you need to create props:

```js
container: {
  flex: 1,
  backgroundColor: '#fff'
},
content: {
  padding: 40,
},
list: {
  marginTop: 20
}
```

## 1.3

Next thing, that you will do - it's a header. To separate the different parts of the app and make easier to update the code - create a new folder "components" and inside it - a new file header.js. Also, it makes the code reusable, lately if you want you can use this component in different parts of your app.

In the top of header.js copy-paste the following code: 

```js
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
```

Now you need to create a new functional component Header, using "default export" because you want to export it automatically. Inside this function, you will return a View component with a Text component, that says 'My Todos'. The View has style property {styles.header} and the Text component - {styles.title}.

Now you need to create a StyleSheet as well. Inside your styles object you have props:

```js
header: {
  height: 80,
  backgroundColor: '#800080',
  paddingTop: 40,
},
  title: {
  textAlign: 'center',
  color: "#fff",
  fontSize: 20,
  fontWeight: 'bold'
  }
```
This how your code should look like in the header.js

```js
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Header() {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>My Todos</Text>
        </View>
    )
};

const styles = StyleSheet.create({
  header: {
    height: 80,
    backgroundColor: '#800080',
    paddingTop: 40,
  },
  title: {
    textAlign: 'center',
    color: "#fff",
    fontSize: 20,
    fontWeight: 'bold'
  }
});
```
### 1.4

Now you have to import your Header component in the App.js and replace the comment "Header" with the ``` < Header /> ``` component.
Finally, you should have this code in your App.js 

```js
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Header from './components/header';

export default function App() {
  const [todos, setTodos] = useState([
    {text: 'Create an react native app', key: '1'},
    {text: 'Dont worry', key: '2'},
    {text: 'Be happy', key: '3'}
  ])
  return (
    <View style={styles.container}>
     <Header />
     <View style={styles.content}>
       {/* to form */}
        <View  style={styles.list}>
          <FlatList
          data={todos}
          renderItem={({ item }) => (
          <Text>{item.text}</Text>
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
    backgroundColor: '#fff'
  },
  content: {
    padding: 40,
  },
  list: {
    marginTop: 20
  }
});
```

Now go to [The part - 2](Part2.md).
