import React, { useState, useCallback } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Stack,
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { commoditiesContractAddress, commoditiesContractAbi } from '../config/commodities-contract';
import { useWalletContext } from '../context/wallet';
import { encodeFunctionData } from 'viem';

interface Commodity {
  id: string;
  name: string;
  symbol: string;
  comId: string;
}

interface PlaceOrderMaterialUIProps {
  onOrderPlaced: () => void;
  commodities: Commodity[];
}

const PlaceOrderMaterialUI: React.FC<PlaceOrderMaterialUIProps> = ({ onOrderPlaced, commodities }) => {
  const { isLoggedIn, provider } = useWalletContext();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    symbolCommodity: '',
    region: '',
    country: '',
    amount: '',
    price: '',
    currency: '',
    harvestDate: '',
    validityPeriod: '',
    isBuyOrder: false,
  });
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleOpen = () => {
    if (!isLoggedIn) {
      setError('Please connect your wallet to place an order.');
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
    setFormData({
      symbolCommodity: '',
      region: '',
      country: '',
      amount: '',
      price: '',
      currency: '',
      harvestDate: '',
      validityPeriod: '',
      isBuyOrder: false,
    });
    setError(null);
    setSuccess(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePlaceOrder = useCallback(async () => {
    if (!provider || !isLoggedIn) {
      setError('Provider not initialized or user not logged in');
      return;
    }

    setPlacingOrder(true);
    setError(null);

    try {
      const uoHash = await provider.sendUserOperation({
        target: commoditiesContractAddress,
        data: encodeFunctionData({
          abi: commoditiesContractAbi,
          functionName: 'placeOrder',
          args: [
            formData.symbolCommodity,
            formData.region,
            formData.country,
            parseInt(formData.amount),
            parseInt(formData.price),
            formData.currency,
            new Date(formData.harvestDate).getTime(),
            formData.validityPeriod,
            formData.isBuyOrder
          ],
        }),
      });

      console.log('User Operation Hash:', uoHash.hash);
      const txHash = await provider.waitForUserOperationTransaction(uoHash.hash);
      console.log('Transaction Hash:', txHash);
      
      setSuccess(true);
      setTimeout(() => {
        handleClose();
        onOrderPlaced();
      }, 2000);
    } catch (error) {
      console.error('Error placing order:', error);
      setError('Failed to place order. Please try again.');
    } finally {
      setPlacingOrder(false);
    }
  }, [formData, provider, isLoggedIn, onOrderPlaced]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isLoggedIn) {
      setError('You must be logged in to place an order.');
      return;
    }
    handlePlaceOrder();
  };

  const isFormValid = () => {
    return formData.symbolCommodity && 
           formData.region && 
           formData.country && 
           formData.amount && 
           formData.price && 
           formData.currency && 
           formData.harvestDate && 
           formData.validityPeriod;
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
        startIcon={<ShoppingCart />}
        onClick={handleOpen}
        disabled={commodities.length === 0}
        sx={{ mb: 3 }}
      >
        Place New Order
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Place New Order</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Order placed successfully! Transaction confirmed.
              </Alert>
            )}
            
            <Stack spacing={2}>
              <TextField
                select
                fullWidth
                label="Commodity"
                name="symbolCommodity"
                value={formData.symbolCommodity}
                onChange={handleChange}
                required
                disabled={placingOrder || success}
              >
                <MenuItem value="">Select a Commodity</MenuItem>
                {commodities.map(commodity => (
                  <MenuItem key={commodity.id} value={commodity.symbol}>
                    {commodity.name} ({commodity.symbol})
                  </MenuItem>
                ))}
              </TextField>
              
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  label="Region"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  required
                  disabled={placingOrder || success}
                  placeholder="e.g., East Africa"
                />
                
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  disabled={placingOrder || success}
                  placeholder="e.g., Ethiopia"
                />
              </Stack>
              
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  type="number"
                  label="Amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                  disabled={placingOrder || success}
                  inputProps={{ min: 1 }}
                />
                
                <TextField
                  fullWidth
                  type="number"
                  label="Price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  disabled={placingOrder || success}
                  inputProps={{ min: 0.01, step: 0.01 }}
                />
              </Stack>
              
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  label="Currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  required
                  disabled={placingOrder || success}
                  placeholder="e.g., USD"
                />
                
                <TextField
                  fullWidth
                  type="date"
                  label="Harvest Date"
                  name="harvestDate"
                  value={formData.harvestDate}
                  onChange={handleChange}
                  required
                  disabled={placingOrder || success}
                  InputLabelProps={{ shrink: true }}
                />
              </Stack>
              
              <TextField
                fullWidth
                label="Validity Period"
                name="validityPeriod"
                value={formData.validityPeriod}
                onChange={handleChange}
                required
                disabled={placingOrder || success}
                placeholder="e.g., 90 days"
              />
              
              <FormControlLabel
                control={
                  <Checkbox
                    name="isBuyOrder"
                    checked={formData.isBuyOrder}
                    onChange={handleChange}
                    disabled={placingOrder || success}
                    color="primary"
                  />
                }
                label="This is a Buy Order (uncheck for Sell Order)"
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} disabled={placingOrder}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={placingOrder || !isFormValid() || success}
              startIcon={placingOrder ? <CircularProgress size={20} /> : <ShoppingCart />}
            >
              {placingOrder ? 'Placing Order...' : 'Place Order'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default PlaceOrderMaterialUI;