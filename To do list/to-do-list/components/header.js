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
        height: 100,
        backgroundColor: '#800080',
        paddingTop: 40,
        width: '100%'
    },
    title: {
        textAlign: 'center',
        color: "#fff",
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30
    }
});