import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useTokenBalances } from "@dynamic-labs/sdk-react-core";
import { useReactiveClient } from '@dynamic-labs/react-hooks';
import { dynamicClient } from '@/client';

export default function TokenBalancesScreen() {
    const { auth, sdk, wallets } = useReactiveClient(dynamicClient); // Destructure wallets from useReactiveClient
    const { tokenBalances, isLoading, isError, error } = useTokenBalances(
        {
            accountAddress: wallets.primary?.address as `0x${string}`,
        }

    );

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (isError) {
        const errorMessage = error ? error : 'An unknown error occurred';
        return <Text>Error: {errorMessage}</Text>;
    }

    return (
        <View>
            {tokenBalances && tokenBalances.map((balance, index) => (
                <Text key={index}>
                    {balance.symbol}: {balance.balance}
                </Text>
            ))}
        </View>
    );
}
