import React, { useState, useCallback } from 'react';
import { commoditiesContractAddress, commoditiesContractAbi } from '../config/commodities-contract';
import { useWalletContext } from '../context/wallet';
import { encodeFunctionData } from 'viem';

interface CreateCommodityProps {
  onCreationComplete: () => void; // Callback prop for when creation is complete
}
const CreateCommodity: React.FC<CreateCommodityProps> =  ({ onCreationComplete }) => {
  const { isLoggedIn, provider } = useWalletContext();
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [creating, setCreating] = useState(false);

  const handleCreateCommodity = useCallback(async () => {
    if (!provider || !name || !symbol) {
      console.error('Provider not initialized or input not provided');
      return;
    }

    setCreating(true);

    try {
      const uoHash = await provider.sendUserOperation({
        target: commoditiesContractAddress,
        data: encodeFunctionData({
          abi: commoditiesContractAbi,
          functionName: 'createCommodity',
          args: [name, symbol],
        }),
      });

      console.log('User Operation Hash:', uoHash.hash);
      const txHash = await provider.waitForUserOperationTransaction(uoHash.hash);
      console.log('Transaction Hash:', txHash);
    } catch (error) {
      console.error('Error creating commodity:', error);
    } finally {
      setCreating(false);
    }
    onCreationComplete();
  }, [name, symbol, provider, onCreationComplete]);

  return (
    <section>
      <h2>Create New Commodity</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (!isLoggedIn) {
            alert('You must be logged in to create a commodity.');
            return;
          }
          handleCreateCommodity();
        }}
      >
        <input
          type="text"
          placeholder="Commodity Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Commodity Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          required
        />
        <button type="submit" disabled={creating || !isLoggedIn}>
          {creating ? 'Creating...' : 'Create Commodity'}
        </button>
      </form>
    </section>
  );
};

export default CreateCommodity;
