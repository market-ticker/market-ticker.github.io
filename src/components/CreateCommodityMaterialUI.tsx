import React, { useState, useCallback } from 'react';
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { commoditiesContractAddress, commoditiesContractAbi } from '../config/commodities-contract';
import { useWalletContext } from '../context/wallet';
import { encodeFunctionData } from 'viem';

interface CreateCommodityMaterialUIProps {
  onCreationComplete: () => void;
}

const CreateCommodityMaterialUI: React.FC<CreateCommodityMaterialUIProps> = ({ onCreationComplete }) => {
  const { isLoggedIn, provider } = useWalletContext();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleOpen = () => {
    if (!isLoggedIn) {
      setError('Please connect your wallet to create a commodity.');
      // Clear error after 5 seconds
      setTimeout(() => setError(null), 5000);
      return;
    }
    setOpen(true);
    setError(null);
    setSuccess(false);
  };

  const handleClose = () => {
    setOpen(false);
    setName('');
    setSymbol('');
    setError(null);
    setSuccess(false);
  };

  const handleCreateCommodity = useCallback(async () => {
    if (!provider || !name || !symbol) {
      setError('Provider not initialized or input not provided');
      return;
    }

    setCreating(true);
    setError(null);

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
      
      setSuccess(true);
      setTimeout(() => {
        handleClose();
        onCreationComplete();
      }, 2000);
    } catch (error) {
      console.error('Error creating commodity:', error);
      setError('Failed to create commodity. Please try again.');
    } finally {
      setCreating(false);
    }
  }, [name, symbol, provider, onCreationComplete]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isLoggedIn) {
      setError('You must be logged in to create a commodity.');
      return;
    }
    handleCreateCommodity();
  };

  return (
    <>
      {error && !open && (
        <Alert severity="warning" sx={{ mb: 2, maxWidth: 400 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={handleOpen}
        sx={{ mb: 3 }}
      >
        Create New Commodity
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Commodity</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Commodity created successfully! Transaction confirmed.
              </Alert>
            )}
            <TextField
              fullWidth
              label="Commodity Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
              required
              disabled={creating || success}
              placeholder="e.g., Premium Coffee"
            />
            <TextField
              fullWidth
              label="Commodity Symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              margin="normal"
              required
              disabled={creating || success}
              placeholder="e.g., COFFEE"
              inputProps={{ style: { textTransform: 'uppercase' } }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} disabled={creating}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={creating || !name || !symbol || success}
              startIcon={creating ? <CircularProgress size={20} /> : <Add />}
            >
              {creating ? 'Creating...' : 'Create Commodity'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default CreateCommodityMaterialUI;