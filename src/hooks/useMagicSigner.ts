import { magicApiKey } from "../config/client";
import { WalletClientSigner, type SmartAccountSigner } from "@alchemy/aa-core";
import { Magic } from "magic-sdk";
import { WalletClient, createWalletClient, custom } from "viem";

export const useMagicSigner = () => {
  const magic = new Magic(magicApiKey);

  const magicClient: WalletClient = createWalletClient({
    transport: custom(magic.rpcProvider),
  });

  const magicSigner: SmartAccountSigner = new WalletClientSigner(
    magicClient,
    "magic"
  );

  return { magic, signer: magicSigner };
};
