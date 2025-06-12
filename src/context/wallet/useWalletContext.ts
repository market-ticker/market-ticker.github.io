import { useContext } from "react";
import { WalletContext } from "./WalletContext";

export const useWalletContext = () => useContext(WalletContext);