import * as React from "react";
import { Text, StyleSheet, View } from "react-native";

const FrameCard = ({ title, value }: { title: string, value: string }) => {
    return (
        <View style={styles.Card}>
            <View style={styles.CardContent}>
                <Text style={styles.CardTitle}>{title}</Text>
                <Text style={styles.CardValue}>{value}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    CardTitle: {
        fontSize: 16,
        lineHeight: 18,
        color: "#6a2c3e",
        textAlign: "left", // or 'justify' if preferred
        flex: 1, // allows the title to fill the width
        fontFamily: "LondrinaSolid-Regular"
    },
    CardValue: {
        fontSize: 34,
        letterSpacing: 0,
        lineHeight: 36,
        color: "#cf4520",
        textAlign: "left",
        fontFamily: "LondrinaSolid-Regular"
    },
    CardContent: {
        gap: 3,
        borderRadius: 8,
        flex: 1,
        justifyContent: 'flex-start',
    },
    Card: {
        flex: 1,
        backgroundColor: "#fff",
        borderStyle: "solid",
        borderColor: "#6a2c3e",
        borderWidth: 1,
        width: "100%",
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderRadius: 8
    }
});

export default FrameCard;
