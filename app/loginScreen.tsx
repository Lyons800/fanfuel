import React from 'react';
import { View, Button, Text } from 'react-native';


export default function LoginScreen() {

    const handleLogin = () => {
        // Implement your login logic here
    };

    return (
        <View>
            <Button title="Login with Dynamic Wallet" onPress={handleLogin} />
            <Text>
                Access granted
            </Text>
        </View>
    );
}
