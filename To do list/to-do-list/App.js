import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Header from './components/header';

export default function App() {
  const [todos, setTodos] = useState([
    {text: 'buy coffe', key: '1'},
    {text: 'create an app', key: '2'},
    {text: 'play on the switch', key: '3'}
  ])
  return (
    <View style={styles.container}>
     <Header />
     <View style={styles.content}>
       {/* to form */}
       <FlatList
       data={todos}
       renderItem={({ item }) => (
       <Text>{item.text}</Text>
       )}
      />
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
});
