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
        margin: 7,
        borderRadius: 10
    }
});
