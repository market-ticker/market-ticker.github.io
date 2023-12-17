import { useState, useCallback } from 'react';
import { commoditiesContractAddress, commoditiesContractAbi } from '../config/commodities-contract';
import { useWalletContext } from '../context/wallet';
import { encodeFunctionData } from 'viem'; // Make sure this utility is correctly implemented

const PlaceOrder = ({ onOrderPlaced, commodities }) => {
  const { isLoggedIn, provider } = useWalletContext();
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePlaceOrder = useCallback(async (event) => {
    event.preventDefault();
    if (!provider || !isLoggedIn) {
      console.error('Provider not initialized or user not logged in');
      return;
    }

    setPlacingOrder(true);

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
            formData.amount,
            formData.price,
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
      onOrderPlaced(); // Callback when order is placed
    } catch (error) {
      console.error('Error placing order:', error);
    } finally {
      setPlacingOrder(false);
    }
  }, [formData, provider, isLoggedIn, onOrderPlaced]);

  return (
    <section>
      <h2>Place New Order</h2>
      <form onSubmit={handlePlaceOrder}>
        {/* Commodity Dropdown */}
        <select
          name="symbolCommodity"
          value={formData.symbolCommodity}
          onChange={handleChange}
          required
        >
          <option value="">Select a Commodity</option>
          {commodities.map(commodity => (
            <option key={commodity.id} value={commodity.symbol}>{commodity.name}</option>
          ))}
        </select>

        {/* Region Input */}
        <input
          type="text"
          name="region"
          placeholder="Region"
          value={formData.region}
          onChange={handleChange}
          required
        />

        {/* Country Input */}
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          required
        />

        {/* Amount Input */}
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        {/* Price Input */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        {/* Currency Input */}
        <input
          type="text"
          name="currency"
          placeholder="Currency"
          value={formData.currency}
          onChange={handleChange}
          required
        />

        {/* Harvest Date Input */}
        <input
          type="date"
          name="harvestDate"
          value={formData.harvestDate}
          onChange={handleChange}
          required
        />

        {/* Validity Period Input */}
        <input
          type="text"
          name="validityPeriod"
          placeholder="Validity Period"
          value={formData.validityPeriod}
          onChange={handleChange}
          required
        />

        {/* Is Buy Order Checkbox */}
        <label>
          Buy Order:
          <input
            type="checkbox"
            name="isBuyOrder"
            checked={formData.isBuyOrder}
            onChange={handleChange}
          />
        </label>

        {/* Submit Button */}
        <button type="submit" disabled={placingOrder}>
          {placingOrder ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </section>
  );
};

export default PlaceOrder;
