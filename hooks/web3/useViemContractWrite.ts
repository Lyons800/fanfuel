import { useState } from 'react';
import { createPublicClient, parseUnits, http } from 'viem';
import { flowTestnet, goerli } from 'viem/chains'; // Use an appropriate chain
import { useReactiveClient } from '@dynamic-labs/react-hooks';
import { dynamicClient } from '@/client';

export function useContractWrite({ contract, functionName, args }: { contract: any, functionName: string, args: any[] }) {
    const { auth, sdk, wallets } = useReactiveClient(dynamicClient);
    const [transaction, setTransaction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const publicClient = createPublicClient({
        chain: flowTestnet, // Replace with your correct chain
        transport: http(),
    });

    const primaryWallet = wallets.primary;

    // Create the wallet client
    const walletClient = primaryWallet
        ? dynamicClient.viem.createWalletClient({
            wallet: primaryWallet,
        })
        : null;

    // Function to simulate and approve tokens
    const simulateAndApproveTokens = async (spenderAddress: `0x${string}`, amount: string) => {
        setLoading(true);
        try {
            if (!walletClient) {
                throw new Error('No wallet client available');
            }

            const tokenContract = {
                address: contract.tokenAddress,
                abi: contract.tokenAbi,
            };

            // Debugging: Log the data being submitted to simulateContract
            console.log('Simulating contract with:', {
                ...tokenContract,
                functionName: 'approve',
                account: primaryWallet?.address,
                args: [spenderAddress, amount],
            });

            // Simulate the contract approval
            const { request } = await publicClient.simulateContract({
                ...tokenContract,
                functionName: 'approve',
                account: primaryWallet?.address as `0x${string}`,
                args: [spenderAddress, amount],
                chain: flowTestnet,
            });


            // Debugging: Log the request object
            console.log('Request object from simulateContract:', request);

            // If simulation is successful, proceed to write the contract
            const txHash = await (await walletClient)?.writeContract(request);

            // Debugging: Log the transaction hash
            console.log('Transaction hash from writeContract:', txHash);

            const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
            setTransaction(receipt as any); // Cast to 'any' to bypass type error
        } catch (err) {
            console.error('Error in simulateAndApproveTokens:', err);
            setError(err as any); // Cast to 'any' to bypass type error
        } finally {
            setLoading(false);
        }
    };

    // Function to send a transaction
    const sendTransaction = async () => {
        setLoading(true);
        if (!primaryWallet || !walletClient) {
            setError(new Error('No wallet available') as any); // Cast to 'any' to bypass type error
            setLoading(false);
            return;
        }

        try {
            const amountInWei = parseUnits(args[1], 18); // Convert amount to BigInt

            // Set a minimum gas price
            const minGasPrice = BigInt(1000000000); // Example minimum gas price

            // Debugging: Log the data being submitted to writeContract
            console.log('Writing contract with:', {
                ...contract,
                functionName,
                account: primaryWallet?.address,
                args: [args[0], amountInWei],
                gasPrice: minGasPrice, // Add gas price to the log
            });

            const txHash = await (await walletClient).writeContract({
                ...contract,
                functionName,
                account: primaryWallet?.address as `0x${string}`,
                args: [args[0], amountInWei],
                gasPrice: minGasPrice, // Set the gas price
            });

            // Debugging: Log the transaction hash
            console.log('Transaction hash from writeContract:', txHash);

            const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });
            setTransaction(receipt as any); // Cast to 'any' to bypass type error
        } catch (err) {
            console.error('Error in sendTransaction:', err);
            setError(err as any); // Cast to 'any' to bypass type error
        } finally {
            setLoading(false);
        }
    };

    return { simulateAndApproveTokens, sendTransaction, transaction, loading, error };
}
