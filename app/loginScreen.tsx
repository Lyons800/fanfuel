import { dynamicClient } from '@/client';
import React from 'react';
import { View, Button, Text } from 'react-native';


export default function LoginScreen() {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button onPress={() => dynamicClient.ui.auth.show()} title="Open Auth Flow UI" />
            <Text>
                Access granted
            </Text>
        </View>
    );
}
