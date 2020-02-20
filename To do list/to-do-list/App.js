import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Header from './components/header';
import TodoItem from './components/todoItem';
import AddToDo from './components/addToDo';

export default function App() {
  const [todos, setTodos] = useState([
    {text: 'Create a react native app', key: '1'},
    {text: 'Dont worry', key: '2'},
    {text: 'Be happy', key: '3'}
  ]);

  const pressHandler = (key) => {
    setTodos((prevTodos)=> {
      return prevTodos.filter(todo => todo.key != key);
    });
  }

  const submitHandler = (text) => {
    setTodos((prevTodos) => {
      return [
        {text: text, key: Math.random().toString()},
        ...prevTodos
      ]
    })
  }
  return (
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
