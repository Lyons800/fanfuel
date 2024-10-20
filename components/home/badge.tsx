import React from 'react';
import { Text, Image, View, StyleSheet, ImageSourcePropType } from 'react-native';

const Badge = ({ text, imageSource }: { text: string, imageSource: ImageSourcePropType }) => {
    return (
        <View style={styles.badgeContainer}>
            <Image style={styles.badgeImage} resizeMode="cover" source={imageSource} />
            <Text style={styles.badgeText}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badgeContainer: {
        height: "100%",
        width: 80,
        alignItems: 'flex-start', // Align items at the top
        flexDirection: 'column',  // Ensure image is above text
        gap: 10,                  // Maintain gap between image and text
    },
    badgeText: {
        color: "#4b4949",
        textAlign: "center",
        fontFamily: "LondrinaSolid-Regular",
        fontSize: 14,
        lineHeight: 16, // Adjusted lineHeight to be greater than or equal to fontSize
        marginBottom: 5,
    },
    badgeImage: {
        height: 70,
        width: 70,
        borderRadius: 100,
    },
});

export default Badge;
