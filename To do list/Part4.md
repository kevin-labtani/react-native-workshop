## Part - 4

In this part, we will improve the todo app.

### 4.1

First of all, you will add some validation to the app.
If the input text is less than 3 characters, the app will send an alert to the user.

To do it use ``` submitHandler ``` function in App.js. You need to add ``` if else condition ``` to check the number of character. If it's more then 3 chars, it will add the new todos in the list, if not send an alert. To use ``` Alert ``` component you must to import it from React-Native, besides you can delete  ``` <Text> ``` component from import because we don't use it anymore.
```js
import { StyleSheet, Alert, View, FlatList } from 'react-native';
```
It's how our function looks like now:
```js
const submitHandler = (text) => {
    if(text.length > 3) {
      setTodos((prevTodos) => {
        return [
          {text: text, key: Math.random().toString()},
          ...prevTodos
        ]
      });
    } else {
      Alert.alert('OOPS!', 'Todos must be over 3 chars long', [
        {text: 'OK'}
      ]);
    }
  }
```
It takes 3 arguments: 
    1. Title of the alert (OOPs!); 
    2. Some kind of message (Todos must be over 3 chars long);
    3. an array with objects, that can represent buttons. In our case we have just one button(OK).

### 4.2

Now you need to dismiss the keyboard, because it's always open, and we want to be able to close it touching anywhere on the screen.

To do that to wrap the whole application in a new component ``` <TouchableWithoutFeedback> ``` component. Also, you need to use ``` <Keyboard> ``` component to dismiss the keyboard.
So in App.js import these components 
```js
import { StyleSheet, Alert, View, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native';
```

Wrap all components in the ``` <TouchableWithoutFeedback> ``` component.
```js
  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <AddToDo submitHandler={submitHandler}/>
        <View style={styles.list}>
            <FlatList
            data={todos}
            renderItem={({ item }) => (
            <TodoItem item={item} pressHandler={pressHandler}/>
            )}
            />
          </View>
      </View>
      </View>
    </TouchableWithoutFeedback>
  );
```
and creat ```onPress ``` handler, that will dismiss the keyboard.
```js
<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
```
So  now when you touch anywere in the screen,  ```onPress``` will aplay dissmiss method to keybord to close it.

### 4.3

It's time to remove a small problem with a ``` <FlatList>```, because if you now add a lot of todos you'll realize, that you can't see the last todos, because it's out of the screen bottom. It happens because the ``` <FlatList>``` is pushed by ``` <TextInput>``` down.
It's very simple to fix, you just need to add ``` flex: 1  ``` to the ``` styles.content``` and ``` styles.list ``` in App.js. It means, that the components take just all available space, and they can't pass the screen.

```js
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  content: {
    flex: 1,
    padding: 40,
  },
  list: {
    flex: 1,
    marginTop: 20
  }
});
```

### 4.4

Now you will add an icon to the left of each todos.
To know more about icons in expo [read official docs](https://docs.expo.io/versions/latest/guides/icons/). But, in brief, when we use ``` expo -init ``` icons are already a part of the library so we don't need to install something additional. So you need just [choose](https://expo.github.io/vector-icons/) an icon and import it to your project.

To  import icons open todoItem.js an copy-paste the folowing code:
```js
import { Feather } from '@expo/vector-icons';
```

``` { Feather } ``` is the source of the icon.

Now create a new ``` <Feather> ``` component inside of the ``` <View> ``` component before the ``` <Text> ``` component. It has props: name, it's the name of using icon; size and color of the icon.
```js
<View style={styles.item}>
  <Feather name='delete'size={18} color='#333'/>
  <Text>
  {item.text}
  </Text>
</View>
```
Just one thing left - style the components a bit more. To make the icon be on the left of the text, add ``` flexDirection: 'row' ``` to the ``` styles.item ```. Then create ``` style={styles.text} ``` and pass ``` marginLeft: 10 ``` in it. Now we have a space between the icon and the todos.

```js
const styles = StyleSheet.create({
    item: {
        shadowColor: 'black',
        shadowOffset: {width: 0, heigth: 2},
        shadowRadius: 4,
        shadowOpacity: .26,
        backgroundColor: 'white',
        elevation: 8,
        padding: 20, 
        margin: 7,
        borderRadius: 10,
        flexDirection: 'row'
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
We will use [open sans font](https://fonts.google.com/specimen/Open+Sans) from Google Fonts, but you can use any font that you like. You just need to download the font and copy-past all "ttf" files from it to ``` assets/fonts```.

Then in the App.js import fonts from the folder.
```js
import * as Fonts from 'expo-font';
```

The symbol ``` * ``` means all files, and 'expo-font' is a package that gives you fonts, and it should be included by default, but run ```expo install expo-font ```to be sure.

Then we create a function, that loads the fonts.
```js
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-italic': require('./assets/fonts/OpenSans-Italic.ttf')
  });
}
```
It returns an object of our fonts, where we write a name of the font and using ``` require ``` you show the path to the chosen font.
This function returns a promise, so it can't be loaded immediately. In this situation you have to use a special component ``` < AppLoading > ``` from 'expo', so import it in App.js. It will prolong the loading screen time until the fonts load. 
```js
import { AppLoading } from 'expo';
```
To make this component works you can use states.
```js
const [dataLoaded, setDataLoaded] = useState(false);
```
You write it below the todolist array in the ``` App function ```. 
Then we write a function that will check a state of DataLoaded(fonts) and if it's false, it will return a ```< AppLoading > ``` component.
 
```js
 const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return <AppLoading 
              startAsync={fetchFonts} 
              onFinish={() => setDataLoaded(true)}
              onError={(err) => console.log(err)}
            />
  }
```
This function has a props:
  1. ``` startAsync ``` that is our loading fonts function.
  2. ```onFinish ``` when the fonts are loaded, it changes state of dataLoaded as ``` true ``` and all app will be loaded.
  3. ```onError ``` if we have an error, it will show it in the connsole.

How to apply the fonts?
Just write this line of code to the style prop of the changing component.
```js
fontFamily: 'name of a font'
```
so now we have in header.js
```js
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
        fontWeight: 'bold',
        fontFamily: 'open-sans'
    }
});
``` 
and in todoItems.js
```js
const styles = StyleSheet.create({
    item: {
        shadowColor: 'black',
        shadowOffset: {width: 0, heigth: 2},
        shadowRadius: 4,
        shadowOpacity: .26,
        backgroundColor: 'white',
        elevation: 8,
        padding: 20, 
        margin: 7,
        borderRadius: 10,
        flexDirection: 'row'
    },
    text: {
        marginLeft: 10,
        fontFamily: 'open-sans'
    }
});
```

### 4.6