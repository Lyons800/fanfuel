import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useContractWrite } from '@/hooks/web3/useViemContractWrite'; // Ensure this is the correct path to your hook
import athleteStakingAbi from '@/contracts/AthleteStakingAbi.json'; // Replace with the correct ABI import path
import flowTestTokenAbi from '@/contracts/FlowTestTokenAbi.json';
export default function StakeScreen() {
    const stakingContractAddress = '0x8fB0C3EF4FAc137D7Bd7ac8d850Ac552b99B5538'; // Staking contract address
    const tokenContractAddress = '0xc62B54A1d4FBBB7b05A53b6039372793842D5c51'; // Token contract address

    // State to handle the user input for staking amount
    const [amountToStake, setAmountToStake] = useState(''); // Store amount in a string to capture user input
    const [playerId] = useState(1); // Example player ID, change this if it's dynamic

    // Use the useContractWrite hook to initiate staking and approval
    const { sendTransaction, simulateAndApproveTokens, transaction, loading, error } = useContractWrite({
        contract: {
            address: stakingContractAddress, // Use staking contract address for staking
            abi: athleteStakingAbi,
            tokenAddress: tokenContractAddress, // Pass the token contract address for approval
            tokenAbi: flowTestTokenAbi, // Pass the token ABI
        },
        functionName: 'stake', // Name of the staking function in your smart contract
        args: [playerId, amountToStake], // Pass the playerId and amount as arguments
    });

    // Function to handle the approval button click
    const handleApproval = async () => {
        try {
            await simulateAndApproveTokens(stakingContractAddress, amountToStake); // Approve the staking contract to transfer tokens
            Alert.alert('Success', 'Approval transaction sent!');
        } catch (err) {
            console.error('Error during approval:', err);
            Alert.alert('Error', 'Failed to approve.');
        }
    };

    // Function to handle the staking button click
    const handleStake = async () => {
        // Check if amountToStake is a valid number before proceeding
        if (isNaN(Number(amountToStake)) || Number(amountToStake) <= 0) {
            Alert.alert('Error', 'Please enter a valid amount to stake.');
            return;
        }

        try {
            await sendTransaction(); // Initiate the staking transaction
            Alert.alert('Success', 'Staking transaction sent!');
            setAmountToStake(''); // Reset the input after staking
        } catch (err) {
            console.error('Error while staking:', err);
            Alert.alert('Error', 'Failed to stake.');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
                    Stake Your Tokens
                </Text>

                {/* Input field to allow user to enter the amount of tokens to stake */}
                <TextInput
                    placeholder="Enter amount to stake"
                    value={amountToStake}
                    onChangeText={setAmountToStake} // Update the state as the user types
                    keyboardType="numeric" // Ensure the user can only enter numeric values
                    style={{
                        borderWidth: 1,
                        borderColor: '#ccc',
                        padding: 10,
                        marginBottom: 20,
                        borderRadius: 5,
                    }}
                />

                {/* Show loading spinner if transaction is in progress, otherwise show the approve/stake buttons */}
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <>
                        <Button
                            title="Approve Tokens"
                            onPress={handleApproval}
                            disabled={loading || !amountToStake} // Disable button when loading or when there's no input
                        />
                        <Button
                            title="Stake Tokens"
                            onPress={handleStake}
                            disabled={loading || !amountToStake} // Disable button when loading or when there's no input
                        />
                    </>
                )}

                {/* Display transaction hash when transaction is complete */}
                {transaction && (
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontSize: 16 }}>Transaction Hash:</Text>
                        {/* <Text>{transaction.transactionHash}</Text> */}
                    </View>
                )}

                {/* Display error message if there is an error */}
                {error && (
                    <View style={{ marginTop: 20 }}>
                        {/* <Text style={{ color: 'red' }}>Error: {error?.message}</Text> */}
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}
