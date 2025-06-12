import { AlchemyProvider } from "@alchemy/aa-alchemy";
import { Address } from "@alchemy/aa-core";
import { createContext } from "react";

export type WalletContextProps = {
  // Functions
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;

  // Properties
  provider: AlchemyProvider;
  ownerAddress?: Address;
  scaAddress?: Address;
  username?: string;
  isLoggedIn: boolean;
};

const defaultUnset = null;
export const WalletContext = createContext<WalletContextProps>({
  // Default Values
  provider: defaultUnset as unknown as AlchemyProvider,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  isLoggedIn: false,
});