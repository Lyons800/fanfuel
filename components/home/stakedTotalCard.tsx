import * as React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '../ThemedText';

export default function StakedTotalCard() {
    return (
        <LinearGradient
            style={[styles.subtract]}
            locations={[0, 1]}
            colors={['#6a2c3e', '#cf4520']}
        >
            <View  >
                <ThemedText type="subtitle" style={[styles.totalAmountStaked, styles.stakeMoreTypo]}>
                    Total amount staked
                </ThemedText>
                <ThemedText type="title" style={styles.text}>
                    $1,680
                </ThemedText>
            </View>
            {/* <Image style={styles.vectorIcon} resizeMode="cover" source={require('path/to/Vector.png')} /> */}

        </LinearGradient>
    );
}

const styles = StyleSheet.create({

    stakeMoreTypo: {
        textAlign: "left",
        fontSize: 16,
        fontFamily: "LondrinaSolid-Regular"
    },
    totalAmountStaked: {
        lineHeight: 20,
        color: "#dadada",
        textAlign: "left"
    },
    text: {
        fontSize: 34,
        letterSpacing: 0,
        lineHeight: 36,
        color: "#fff",
        textAlign: "left",
        fontFamily: "LondrinaSolid-Regular"
    },

    subtract: {
        borderRadius: 8,
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
        overflow: "hidden",
        paddingHorizontal: 20,
        paddingVertical: 20,
    },

});
