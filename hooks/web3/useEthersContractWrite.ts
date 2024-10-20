import { useState } from 'react';
import { ethers } from 'ethers';
import { useReactiveClient } from '@dynamic-labs/react-hooks';
import { dynamicClient } from '@/client';

export function useEthersContractWrite({ contract, functionName, args }: { contract: any, functionName: string, args: any[] }) {
    const { auth, sdk, wallets } = useReactiveClient(dynamicClient);
    const [transaction, setTransaction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const primaryWallet = wallets.primary;

    // Create the ethers provider and signer
    const provider = new ethers.JsonRpcProvider('https://rpc.ankr.com/flow_testnet'); // Replace with your RPC URL
    const signer = primaryWallet ? provider.getSigner(primaryWallet.address) : null;

    // Function to simulate and approve tokens
    const simulateAndApproveTokens = async (spenderAddress: string, amount: string) => {
        setLoading(true);
        try {
            if (!signer) {
                throw new Error('No wallet client available');
            }

            const tokenContract = new ethers.Contract(contract.tokenAddress, contract.tokenAbi, await signer);

            // Debugging: Log the data being submitted to approve
            console.log('Simulating contract with:', {
                address: contract.tokenAddress,
                abi: contract.tokenAbi,
                functionName: 'approve',
                account: primaryWallet?.address,
                args: [spenderAddress, amount],
            });

            // Simulate the contract approval
            const tx = await tokenContract.approve(spenderAddress, amount);

            // Debugging: Log the transaction hash
            console.log('Transaction hash from approve:', tx.hash);

            const receipt = await tx.wait();
            setTransaction(receipt);
        } catch (err) {
            console.error('Error in simulateAndApproveTokens:', err);
            setError(err as any);
        } finally {
            setLoading(false);
        }
    };

    // Function to send a transaction
    const sendTransaction = async () => {
        setLoading(true);
        if (!primaryWallet || !signer) {
            // setError(() => new Error('No wallet available'  ));
            setLoading(false);
            return;
        }

        try {
            const amountInWei = ethers.parseUnits(args[1], 18); // Convert amount to BigInt

            // Set a minimum gas price
            const minGasPrice = ethers.parseUnits('1', 'gwei'); // Example minimum gas price

            // Debugging: Log the data being submitted to the contract
            console.log('Writing contract with:', {
                address: contract.address,
                abi: contract.abi,
                functionName,
                account: primaryWallet?.address,
                args: [args[0], amountInWei],
                gasPrice: minGasPrice.toString(), // Add gas price to the log
            });

            const contractInstance = new ethers.Contract(contract.address, contract.abi, await signer);
            const tx = await contractInstance[functionName](...args, { gasPrice: minGasPrice });

            // Debugging: Log the transaction hash
            console.log('Transaction hash from writeContract:', tx.hash);

            const receipt = await tx.wait();
            setTransaction(receipt);
        } catch (err) {
            console.error('Error in sendTransaction:', err);
            setError(err as any);
        } finally {
            setLoading(false);
        }
    };

    return { simulateAndApproveTokens, sendTransaction, transaction, loading, error };
}
