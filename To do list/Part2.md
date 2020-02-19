## Part - 2

In this part, you will style the todos and add some press events to them.

### 2.1

 You start with creating of a separate ``` <TodoItem /> ``` component for todo template. Remplace 
 ``` <Text>{item.text}</Text>``` 
 with the new component, then inside "components" folder create a new file 'todoItem.js'. 

 First of all, you copy-paste this code at the top of the new file.

 ```js
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
```

TouchableOpacity is a wrapper for making views respond properly to touches. On press down, the opacity of the wrapped view is decreased, dimming it.

Then create a function "TodoItem", which has just one prop "props" and export this function by default. Now go to the App.js and pass prop item={item} to the ``` <TodoItem />``` component. After return to the todoItem.js and replace "props" with {item}, and now we can use item(todo) inside TodoItem function. 

### 2.2

Now add return in TodoItem function with the following code 
```js
<TouchableOpacity>
    <View style={styles.item}>
        <Text>
        {item.text}
        </Text>
    </View>
</TouchableOpacity>
```
Then create const Styles using styleSheet.create function and pass this props to it:
```js
item: {
        shadowColor: 'black',
        shadowOffset: {width: 0, heigth: 2},
        shadowRadius: 4,
        shadowOpacity: .26,
        backgroundColor: 'white',
        elevation: 8,
        padding: 20, 
        margin: 5,
        borderRadius: 10
    }
```
Now go to the App.js and import new ``` <TodoItem /> ``` component.

### 2.3

And now you have just one thing to do to finish this part.

In the ``` <TouchableOpacity> ``` component of the todoItem.js write a function 
```js
<TouchableOpacity onPress={() => pressHandler(item.key)}>
```
This function will delete your complited todo. But you can't delete it from this part. So go to the App.js and create new function in function App after the array with todos.

```js
const pressHandler = (key) => {
    setTodos((prevTodos)=> {
      return prevTodos.filter(todo => todo.key != key);
    });
}
```
Then you need to pass this function as the second prop in ``` <TodoItem /> ``` component.

```js
<TodoItem item={item} pressHandler={pressHandler}/>
```

How does it work?
When you press on one of your todos it will call the function "pressHandler" and pass the item key to it. In the App.js we will receive this key in the pressHandler function and then delete todo with that key from todolist and return a new array of todos.

### 2.4

Finally, you should have the next code in your todoItem.js

```js
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function TodoItem({item, pressHandler}) {
    return (
        <TouchableOpacity onPress={() => pressHandler(item.key)}>
            <View style={styles.item}>
                <Text>
                {item.text}
                </Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    item: {
        shadowColor: 'black',
        shadowOffset: {width: 0, heigth: 2},
        shadowRadius: 4,
        shadowOpacity: .26,
        backgroundColor: 'white',
        elevation: 8,
        padding: 20, 
        margin: 5,
        borderRadius: 10
    }
});
```

and in the App.js:

```js
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Header from './components/header';
import TodoItem from './components/todoItem';

export default function App() {
  const [todos, setTodos] = useState([
    {text: 'buy coffe', key: '1'},
    {text: 'create an app', key: '2'},
    {text: 'play on the switch', key: '3'}
  ]);

  const pressHandler = (key) => {
    setTodos((prevTodos)=> {
      return prevTodos.filter(todo => todo.key != key);
    });
  }
  return (
    <View style={styles.container}>
     <Header />
     <View style={styles.content}>
       {/* to form */}
       <View  style={styles.list}>
          <FlatList
          data={todos}
          renderItem={({ item }) => (
          <TodoItem item={item} pressHandler={pressHandler}/>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 40,
  },
  list: {
    marginTop: 20
  }
});
```

You are ready to make [The part - 3](Part3.md).