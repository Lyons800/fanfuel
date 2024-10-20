import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';

// ... existing code ...

interface AthleteCardProps {
    id: string;
    name: string;
    sport: string;
    university: string;
    imageUrl: string;
    tags: string[];
    bio: string;
}

const AthleteCard: React.FC<AthleteCardProps> = ({ id, name, sport, university, imageUrl, tags, bio }) => {
    const router = useRouter();

    const handlePress = () => {
        console.log(`Navigating to AthleteDetail with id: ${id}`); // Debugging log
        router.push({ pathname: '/athleteDetail', params: { id } });
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <TouchableOpacity onPress={handlePress}>
                <View style={styles.frameParent}>
                    <View style={styles.frameGroup}>
                        <Image
                            source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl}
                            style={styles.frameChild}
                            resizeMode="cover"
                        />
                        <View style={[styles.frameContainer, styles.frameSpaceBlock]}>
                            <View style={styles.jonathanPriceParent}>
                                <Text style={[styles.jonathanPrice, styles.jonathanPriceClr]}>{name.toUpperCase()}</Text>
                                <Text style={[styles.stanfordSoccer, styles.stakedByYouTypo]}>{`${university} | ${sport}`}</Text>
                            </View>
                            <View style={styles.frameView}>
                                <View style={[styles.cardTopScoreWrapper]}>
                                    <View style={styles.cardTopScore}>
                                        <Text style={[styles.midfielder, styles.juniorPosition]}>{tags[0]}</Text>
                                    </View>
                                </View>
                                <View style={[styles.cardTopScoreContainer]}>
                                    <View style={styles.cardTopScore1}>
                                        <Text style={[styles.junior, styles.juniorPosition]}>{tags[1]}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.frameSpaceBlock}>
                            <View style={styles.cardTopScore2}>
                                <Text style={[styles.imRaisingFunds, styles.juniorPosition]}>{bio}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </GestureHandlerRootView>
    );
}

// Add styles for the bottom sheet content
const styles = StyleSheet.create({
    // ... existing styles ...
    bottomSheetContent: {
        backgroundColor: 'white',
        padding: 16,
        height: '100%',
    },
    sheetTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },

    // ... existing styles ...
    frameParent: {
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#f8f8f8',
    },
    frameGroup: {
        flexDirection: 'column',
    },
    frameChild: {
        width: '100%',
        height: 200,
    },
    frameContainer: {
        padding: 10,
    },
    frameSpaceBlock: {
        marginVertical: 5,
    },
    jonathanPriceParent: {
        marginBottom: 10,
    },
    jonathanPrice: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    jonathanPriceClr: {
        color: '#333',
    },
    stanfordSoccer: {
        fontSize: 14,
        color: '#666',
    },
    stakedByYouTypo: {
        fontStyle: 'italic',
    },
    frameView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardTopScoreWrapper: {
        flex: 1,
    },
    cardTopScore: {
        backgroundColor: '#e0e0e0',
        padding: 5,
        borderRadius: 5,
    },
    midfielder: {
        fontSize: 12,
        color: '#444',
    },
    juniorPosition: {
        fontWeight: '600',
    },
    cardTopScoreContainer: {
        flex: 1,
    },
    cardTopScore1: {
        backgroundColor: '#d0d0d0',
        padding: 5,
        borderRadius: 5,
    },
    junior: {
        fontSize: 12,
        color: '#444',
    },
    cardTopScore2: {
        backgroundColor: '#c0c0c0',
        padding: 5,
        borderRadius: 5,
    },
    imRaisingFunds: {
        fontSize: 12,
        color: '#444',
    },
});

export default AthleteCard;
