import { useEffect, useState } from 'react';
import { createPublicClient, http } from 'viem';
import { flowTestnet, goerli } from 'viem/chains'; // Use the appropriate chain
import { useReactiveClient } from '@dynamic-labs/react-hooks';
import { dynamicClient } from '@/client';

export function useTokenBalance({ tokenAddress, tokenAbi }: { tokenAddress: `0x${string}`, tokenAbi: any }) {
    const { wallets } = useReactiveClient(dynamicClient);
    const [balance, setBalance] = useState<null | string>(null); // Specify the type of balance
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | Error>(null); // Specify the type of error

    const publicClient = createPublicClient({
        chain: flowTestnet, // Replace with your correct chain
        transport: http(),
    });

    const primaryWallet = wallets.primary;

    useEffect(() => {
        if (primaryWallet?.address) {
            fetchBalance(primaryWallet.address as `0x${string}`); // Ensure the address is of the correct type
        }
    }, [primaryWallet]);

    const fetchBalance = async (walletAddress: `0x${string}`) => {
        setLoading(true);
        try {
            const tokenBalance = await publicClient.readContract({
                address: tokenAddress,
                abi: tokenAbi,
                functionName: 'balanceOf',
                args: [walletAddress],
            }) as string; // Specify the expected type of tokenBalance

            setBalance(tokenBalance);
        } catch (err) {
            console.error('Error fetching token balance:', err);
            setError(err as Error); // Specify the expected type of error
        } finally {
            setLoading(false);
        }
    };

    return { balance, loading, error };
}
