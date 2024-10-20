import { dynamicClient } from '@/client';
import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';


export default function LoginScreen() {

    return (
        <View style={styles.container}>
            <Text style={styles.banner}>Welcome to FanFuel</Text>
            <Text style={styles.caption}>
                Empowering collegiate athletes to excel with our innovative rewards platform. Stake your support and fuel their journey to greatness!
            </Text>
            <Button onPress={() => dynamicClient.ui.auth.show()} title="Open Auth Flow UI" />
            <Text>
                Access granted
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    banner: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#4A90E2',
        textAlign: 'center',
    },
    caption: {
        fontSize: 16,
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
});
