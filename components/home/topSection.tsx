import React from 'react';
import StakedTotalCard from './stakedTotalCard';
import FrameCard from './frameCard';
import { ThemedView } from '../ThemedView';
import { StyleSheet, View } from 'react-native';
import AchievementsFrame from './achievements';

const TopSection = () => {
    return (
        <ThemedView style={styles.sectionContainer}>
            <StakedTotalCard />
            <View style={styles.rowContainer}>
                <FrameCard title="Total raffles won" value="$268" />
                <FrameCard title="Raffles tickets earned" value="450" />
            </View>
            <AchievementsFrame />
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        marginBottom: 24,
        paddingHorizontal: 16,
        gap: 8,
    },
    rowContainer: {
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'space-between', // Adjust as needed
    }
});

export default TopSection;
