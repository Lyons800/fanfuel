import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
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
                    <Image
                        source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl}
                        style={styles.frameChild}
                        resizeMode="cover"
                    />
                    <View style={[styles.frameGroup, styles.frameSpaceBlock]}>
                        <View style={styles.hanaKimParent}>
                            <Text style={[styles.hanaKim, styles.hanaKimClr]}>{name.toUpperCase()}</Text>
                            <Text style={[styles.stanfordSoccer, styles.fansTypo]}>{`${university} | ${sport}`}</Text>
                        </View>
                        <View style={styles.frameContainer}>
                            <View style={[styles.cardTopScoreWrapper, styles.cardSpaceBlock]}>
                                <View style={styles.cardTopScore}>
                                    <Text style={[styles.goalkeeper, styles.goalkeeperPosition]}>{tags[0]}</Text>
                                </View>
                            </View>
                            <View style={[styles.cardTopScoreContainer, styles.cardSpaceBlock]}>
                                <View style={styles.cardTopScore}>
                                    <Text style={[styles.goalkeeper, styles.goalkeeperPosition]}>{tags[1]}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.frameSpaceBlock}>
                        <View style={styles.cardTopScore2}>
                            <Text style={[styles.iveAlwaysDreamed, styles.goalkeeperPosition]}>{bio}</Text>
                        </View>
                    </View>
                    <LinearGradient style={styles.stakedParent} locations={[0, 1]} colors={['#6a2c3e', '#cf4520']}>
                        <Text style={styles.staked}>
                            <Text style={styles.text}>
                                <Text style={styles.text1}>$1790</Text>
                            </Text>
                            <Text style={styles.fansTypo}>
                                <Text style={styles.text}>{` `}</Text>
                                <Text style={styles.staked2}>staked</Text>
                            </Text>
                        </Text>
                        <Text style={[styles.fans, styles.fansTypo]}>
                            <Text style={styles.text}>{`16 `}</Text>
                            <Text style={styles.staked2}>fans</Text>
                        </Text>
                    </LinearGradient>
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
    hanaKimParent: {
        alignItems: "center"
    },
    hanaKim: {
        fontSize: 18,
        textAlign: "left",
        fontFamily: "LondrinaSolid-Regular"
    },
    hanaKimClr: {
        color: "#000",
        textAlign: "left"
    },
    stanfordSoccer: {
        fontSize: 14,
        textAlign: "left",
        color: "#000"
    },
    fansTypo: {
        fontFamily: "LondrinaSolid-Light",
        fontWeight: "300"
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
    goalkeeper: {
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
    cardSpaceBlock: {
        paddingVertical: 4,
        paddingHorizontal: 6,
        borderRadius: 40,
        alignItems: "center"
    },
    goalkeeperPosition: {
        textAlign: "center",
        color: "#6a2c3e",
        left: "50%",
        top: "50%",
        position: "absolute"
    },
    iveAlwaysDreamed: {
        marginTop: -34,
        marginLeft: -73,
        width: 146,
        fontFamily: "LondrinaSolid-Light",
        fontWeight: "300",
        fontSize: 14
    },
    text1: {
        fontFamily: "LondrinaSolid-Regular"
    },
    text: {
        color: "#fff",
        fontSize: 14
    },
    staked2: {
        color: "rgba(255, 255, 255, 0.9)",
        fontSize: 12
    },
    staked: {
        textAlign: "left"
    },
    fans: {
        textAlign: "left"
    },
    stakedParent: {
        justifyContent: "space-between",
        padding: 8,
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "stretch"
    },
});

export default AthleteCard;
