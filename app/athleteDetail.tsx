import React, { useEffect, useState } from 'react';
import {
    View,
    ImageBackground,
    StyleSheet,
    ActivityIndicator,
    TextInput,
    Button,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    Alert, // Import Image component
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import AthleteBio from '@/components/athleteBio';
import athleteStakingAbi from '@/contracts/AthleteStakingAbi.json';
import flowTestTokenAbi from '@/contracts/FlowTestTokenAbi.json';
import { useContractWrite } from '@/hooks/web3/useViemContractWrite';

// Define the Athlete type
interface Athlete {
    id: number;
    name: string;
    sport: string;
    university: string;
    imageName: string;
    backgroundImageName?: string;
    tags: string[];
    bio: string;
}

// Import the athletes data
const athletes: Athlete[] = require('../components/home/athletes.json');

// Import images and create a mapping
const images = {
    'player1.png': require('@/assets/images/player1.png'),
    'player2.png': require('@/assets/images/player2.png'),
    'player3.png': require('@/assets/images/player3.png'),
    'player4.png': require('@/assets/images/player4.png'),
    'player5.png': require('@/assets/images/player5.png'),
    'playerbg1.png': require('@/assets/images/playerbg1.png'),
    // Add other images as needed
};

const AthleteDetail = () => {
    const route = useRoute();
    const { params } = route;
    const id = params && 'id' in params ? params.id : null;
    const [athlete, setAthlete] = useState<Athlete | null>(null);
    const [loading, setLoading] = useState(true);
    const [inputValue, setInputValue] = useState('1 FLOW');
    const [amountToStake, setAmountToStake] = useState('');
    const [playerId] = useState(1); // Example player ID, change this if it's dynamic

    const stakingContractAddress = '0x8fB0C3EF4FAc137D7Bd7ac8d850Ac552b99B5538';
    const tokenContractAddress = '0xc62B54A1d4FBBB7b05A53b6039372793842D5c51';

    const { sendTransaction, simulateAndApproveTokens, transaction, loading: contractLoading, error } = useContractWrite({
        contract: {
            address: stakingContractAddress,
            abi: athleteStakingAbi,
            tokenAddress: tokenContractAddress,
            tokenAbi: flowTestTokenAbi,
        },
        functionName: 'stake',
        args: [playerId, amountToStake],
    });

    const handleApproval = async () => {
        try {
            // Ensure the wallet interaction is opened as a modal or new screen
            await simulateAndApproveTokens(stakingContractAddress, amountToStake);
            Alert.alert('Success', 'Approval transaction sent!');
        } catch (err) {
            console.error('Error during approval:', err);
            Alert.alert('Error', 'Failed to approve.');
        }
    };

    const handleStake = async () => {
        if (isNaN(Number(amountToStake)) || Number(amountToStake) <= 0) {
            Alert.alert('Error', 'Please enter a valid amount to stake.');
            return;
        }

        try {
            // Simulate a delay to mimic a real transaction
            setLoading(true);
            setTimeout(() => {
                Alert.alert('Success', 'Staking transaction simulated successfully!');
                setAmountToStake('');
                setLoading(false);
            }, 2000); // 2-second delay
        } catch (err) {
            console.error('Error while staking:', err);
            Alert.alert('Error', 'Failed to stake.');
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id !== null) {
            const numericId = Number(id); // Convert ID to number
            console.log('Numeric ID:', numericId);
            const foundAthlete =
                athletes.find((athlete) => athlete.id === numericId) || null;
            console.log('Found Athlete:', foundAthlete);
            setAthlete(foundAthlete);
            setLoading(false);
        }
    }, [id]);

    const handleButtonPress = () => {
        // Handle button press logic here
        console.log('Button pressed with input:', inputValue);
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <View style={styles.frameParent}>
                        <View style={styles.headerContainer}>
                            <ImageBackground
                                style={styles.coverImage}
                                resizeMode="cover"
                                source={
                                    athlete &&
                                        athlete.backgroundImageName &&
                                        images[athlete.backgroundImageName as keyof typeof images]
                                        ? images[athlete.backgroundImageName as keyof typeof images]
                                        : athlete &&
                                            athlete.imageName &&
                                            images[athlete.imageName as keyof typeof images]
                                            ? images[athlete.imageName as keyof typeof images]
                                            : require('@/assets/images/playerbg1.png') // Default image
                                }
                            />
                            {athlete && (
                                <Image
                                    style={styles.profileImage}
                                    resizeMode="cover"
                                    source={images[athlete.imageName as keyof typeof images]}
                                />
                            )}
                        </View>
                        {athlete && (
                            <View style={styles.bioContainer}>
                                <AthleteBio
                                    name={athlete.name}
                                    school={athlete.university}
                                    sport={athlete.sport}
                                    tags={athlete.tags}
                                    bio={athlete.bio}
                                />
                            </View>
                        )}
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter amount to stake"
                            value={amountToStake}
                            onChangeText={setAmountToStake}
                            keyboardType="numeric"
                        />
                        {loading ? (
                            <ActivityIndicator size="large" color="#0000ff" />
                        ) : (
                            <>
                                <Button
                                    title="Approve Tokens"
                                    onPress={handleApproval}
                                    disabled={loading || !amountToStake}
                                />
                                <Button
                                    title="Stake Tokens"
                                    onPress={handleStake}
                                    disabled={loading || !amountToStake}
                                />
                            </>
                        )}
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

// Updated styles
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
    },
    frameParent: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    headerContainer: {
        position: 'relative',
        width: '100%',
        height: 260, // Adjust the height as needed
        alignItems: 'center',
        marginBottom: 60, // Further increase margin below the background image
    },
    coverImage: {
        width: '100%',
        height: '100%',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    profileImage: {
        width: 200, // Increase size as needed
        height: 200,
        borderRadius: 10, // Ensure no rounding
        position: 'absolute',
        bottom: -50, // Adjust to keep it overlapping at the bottom of the cover image
        left: '50%',
        marginLeft: -100, // Center it horizontally
        borderWidth: 2,
        borderColor: '#fff', // Optional: Add a white border around the profile image

    },
    bioContainer: {
        paddingHorizontal: 20, // Add horizontal padding
    },
    bioText: {
        fontFamily: 'LondrinaSolid', // Use the LondrinaSolid font
        fontSize: 16, // Adjust font size as needed
        color: '#000', // Adjust text color as needed
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
    },
    input: {
        width: '30%', // Make the input narrower
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginRight: 10,
    },
});

export default AthleteDetail;
