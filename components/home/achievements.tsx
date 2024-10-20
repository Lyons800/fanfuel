import React from 'react';
import { View, StyleSheet, ImageSourcePropType, ScrollView } from 'react-native';
import Badge from './badge';

const badgeData = [
    { text: "Supported 3+ Athletes", imageSource: require("../../assets/images/noun1.png") },
    { text: "Staked $1500", imageSource: require("../../assets/images/noun2.png") },
    { text: "Staked in Rising Star", imageSource: require("../../assets/images/noun3.png") },
    { text: "Stake $2000 ($320 more)", imageSource: require("../../assets/images/noun4.png") },
    { text: "Support basketball", imageSource: require("../../assets/images/noun5.png") },
];

const AchievementsFrame = () => {
    return (
        <View style={styles.frameParent}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={true} contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.groupParent}>
                    {badgeData.map((badge, index) => (
                        <Badge key={index} text={badge.text} imageSource={badge.imageSource as ImageSourcePropType} />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    frameParent: {
        borderRadius: 16,
        flex: 1,
        alignItems: "flex-start",
        width: "100%",
        height: 150,
    },
    scrollViewContent: {
        alignItems: 'center', // Center items vertically in the ScrollView
        paddingHorizontal: 16, // Add padding to prevent overlap at the edges
    },
    groupParent: {
        justifyContent: "center",
        gap: 16,
        flexDirection: "row",
    },
});

export default AchievementsFrame;
