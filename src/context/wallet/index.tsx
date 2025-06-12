/* eslint-disable react-refresh/only-export-components */
"use client";
import { useAlchemyProvider } from "../../hooks/useAlchemyProvider";
import { useMagicSigner } from "../../hooks/useMagicSigner";
import { Address } from "@alchemy/aa-core";
import {
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { WalletContext } from "./WalletContext";

export { useWalletContext } from "./useWalletContext";

export const WalletContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [ownerAddress, setOwnerAddress] = useState<Address>();
  const [scaAddress, setScaAddress] = useState<Address>();
  const [username, setUsername] = useState<string>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const { magic, signer } = useMagicSigner();
  const { provider, connectProviderToAccount, disconnectProviderFromAccount } =
    useAlchemyProvider();

  const login = useCallback(
    async (email: string) => {
      if (!magic || !magic.user || !signer) {
        throw new Error("Magic not initialized");
      }

      const didToken = await magic.auth.loginWithEmailOTP({
        email,
      });
      const metadata = await magic.user.getMetadata();
      if (!didToken || !metadata.publicAddress || !metadata.email) {
        throw new Error("Magic login failed");
      }

      setIsLoggedIn(true);
      connectProviderToAccount(signer);
      setUsername(metadata.email);
      setOwnerAddress(metadata.publicAddress as Address);
      setScaAddress(await provider.getAddress());
    },
    [magic, connectProviderToAccount, signer, provider]
  );

  const logout = useCallback(async () => {
    if (!magic || !magic.user) {
      throw new Error("Magic not initialized");
    }

    if (!(await magic.user.logout())) {
      throw new Error("Magic logout failed");
    }

    setIsLoggedIn(false);
    disconnectProviderFromAccount();
    setUsername(undefined);
    setOwnerAddress(undefined);
    setScaAddress(undefined);
  }, [magic, disconnectProviderFromAccount]);

  useEffect(() => {
    async function fetchData() {
      if (!magic || !magic.user || !signer) {
        throw new Error("Magic not initialized");
      }

      const isLoggedIn = await magic.user.isLoggedIn();

      if (!isLoggedIn) {
        return;
      }

      const metadata = await magic.user.getMetadata();
      if (!metadata.publicAddress || !metadata.email) {
        throw new Error("Magic login failed");
      }

      setIsLoggedIn(isLoggedIn);
      connectProviderToAccount(signer);
      setUsername(metadata.email);
      setOwnerAddress(metadata.publicAddress as Address);
      setScaAddress(await provider.getAddress());
    }
    fetchData();
  }, [magic, connectProviderToAccount, signer, provider]);

  return (
    <WalletContext.Provider
      value={{
        login,
        logout,
        isLoggedIn,
        provider,
        ownerAddress,
        scaAddress,
        username,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
