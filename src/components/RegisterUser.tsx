import React, { useState, useCallback } from 'react';
import { commoditiesContractAddress, commoditiesContractAbi } from '../config/commodities-contract';
import { useWalletContext } from '../context/wallet';
import { encodeFunctionData } from 'viem';

interface RegisterUserProps {
  onRegistrationComplete: () => void; // Callback prop for when registration is complete
}

const RegisterUser: React.FC<RegisterUserProps> = ({ onRegistrationComplete }) => {
  const { isLoggedIn, provider } = useWalletContext();
  const [name, setName] = useState('');
  const [userType, setUserType] = useState('1'); // Default to 'PRODUCER_VENDOR'
  const [location, setLocation] = useState('');
  const [verificationStatus, setVerificationStatus] = useState(false);
  const [registering, setRegistering] = useState(false);

  const handleRegisterUser = useCallback(async () => {
    if (!provider || !name || !userType || !location) {
      console.error('Provider not initialized or input not provided');
      return;
    }

    setRegistering(true);

    try {
      const uoHash = await provider.sendUserOperation({
        target: commoditiesContractAddress,
        data: encodeFunctionData({
          abi: commoditiesContractAbi,
          functionName: 'registerUser',
          args: [name, userType, location, verificationStatus],
        }),
      });

      console.log('User Operation Hash:', uoHash.hash);
      const txHash = await provider.waitForUserOperationTransaction(uoHash.hash);
      console.log('Transaction Hash:', txHash);
    } catch (error) {
      console.error('Error registering user:', error);
    } finally {
      setRegistering(false);
    }
    onRegistrationComplete();
  }, [name, userType, location, verificationStatus, provider, onRegistrationComplete]);

  return (
    <section>
      <h2>Register New User</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (!isLoggedIn) {
            alert('You must be logged in to register a user.');
            return;
          }
          handleRegisterUser();
        }}
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <select
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          required
        >
          <option value="1">Producer</option>
          <option value="2">First trade agent</option>
          <option value="3">Exporter</option>
          <option value="4">Admin</option>
        </select>
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <div>
          <label>
            Verification Status:
            <input
              type="checkbox"
              checked={verificationStatus}
              onChange={(e) => setVerificationStatus(e.target.checked)}
            />
          </label>
        </div>
        <button type="submit" disabled={registering || !isLoggedIn}>
          {registering ? 'Registering...' : 'Register User'}
        </button>
      </form>
    </section>
  );
};

export default RegisterUser;
