import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { dynamicClient } from '@/client';

export default function LoginScreen() {
    return (
        <LinearGradient style={styles.container} locations={[0, 1]} colors={['#6a2c3e', '#cf4520']} >
            <Image style={styles.image} resizeMode="cover" source={require('@/assets/images/mbappe.png')} />
            <Text style={[styles.banner, styles.textLayout]}>Welcome to FanFuel</Text>
            <Text style={[styles.caption, styles.textLayout]}>
                Empowering collegiate athletes to excel with our innovative rewards platform. Stake your support and fuel their journey to greatness!
            </Text>

            <TouchableOpacity style={styles.bottomButton} onPress={() => dynamicClient.ui.auth.show()}>
                <Text style={styles.buttonText}>Sign In with Wallet</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        borderRadius: 20,
        overflow: 'hidden',
    },
    textLayout: {
        width: 263,
        textAlign: 'left',
        color: '#fff',
        position: 'absolute',
    },
    banner: {
        top: 600, // Text remains in the right place
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'LondrinaSolid-Regular',
    },
    caption: {
        top: 650, // Text remains in the right place
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'LondrinaSolid-Light',
    },
    image: {
        top: 140, // Start from the top
        width: 220,
        height: 450, // Reduced height to fit the screen
        position: 'absolute',
    },
    buttonContainer: {
        top: 600,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 48,
    },
    button: {
        borderRadius: 16,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingHorizontal: 80,
        paddingVertical: 16,
    },
    buttonText: {
        color: '#cf4520',
        fontSize: 19,
        fontFamily: 'LondrinaSolid-Regular',
    },
    signUpText: {
        color: '#fff',
        fontSize: 19,
        fontFamily: 'LondrinaSolid-Light',
        fontWeight: '300',
    },
    bottomButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        borderRadius: 16,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
    },
});
