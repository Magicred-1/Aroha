// Web3Auth Libraries
import { useCallback } from "react";
import { AuthAdapter } from "@web3auth/auth-adapter";
import { CHAIN_NAMESPACES, UX_MODE, WALLET_ADAPTERS, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { Chain, sepolia } from "wagmi/chains";

export enum Web3AuthProvider {
  GOOGLE,
  APPLE,
}

export const useWeb3AuthConnectorInstance = () => {
  // Create Web3Auth Instance
  const name = "My App Name";
  const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x" + sepolia.id.toString(16),
    rpcTarget: sepolia.rpcUrls.default.http[0], // This is the public RPC we have added, please pass on your own endpoint while creating an app
    displayName: sepolia.name,
    tickerName: sepolia.nativeCurrency?.name,
    ticker: sepolia.nativeCurrency?.symbol,
    blockExplorerUrl: sepolia.blockExplorers?.default.url[0] as string,
  };

  const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });

  const web3AuthInstance = new Web3AuthNoModal({
    clientId: "BPTp2xAf9qjixUTlF654f6leX_kiNJa5_X8d2eeF_JFTu2JgSsh4MxSSKkEf-XS0We-lg5_DrOCY_7tNjL0V_B8",
    privateKeyProvider,
    chainConfig,
    uiConfig: {
      appName: name,
      defaultLanguage: "en",
      logoLight: "https://web3auth.io/images/web3authlog.png",
      logoDark: "https://web3auth.io/images/web3authlogodark.png",
      mode: "light",
    },
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
    enableLogging: true,
  });

  const authAdapter = new AuthAdapter({
    adapterSettings: {
      uxMode: UX_MODE.REDIRECT,
    },
    privateKeyProvider,
  });

  web3AuthInstance.configureAdapter(authAdapter);

  const getProviderConfig = (loginProvider: Web3AuthProvider) => {
    switch (loginProvider) {
      case Web3AuthProvider.APPLE:
        return { loginProvider: "apple" };
      case Web3AuthProvider.GOOGLE:
        return { mfaLevel: "none", loginProvider: "google" };
    }
  };

  const web3AuthLogin = useCallback(
    async (loginProvider: Web3AuthProvider) => {
      if (!web3AuthInstance) return;

      const providerConfig = getProviderConfig(loginProvider);

      try {
        await web3AuthInstance.init();
        const web3authProvider = await web3AuthInstance.connectTo(WALLET_ADAPTERS.AUTH, providerConfig);
      } catch (error) {
        throw new Error(`Failed to connect with wallet: ${error}`);
      }
    },
    [web3AuthInstance],
  );

  return {
    web3AuthInstance,
    web3AuthLogin,
  };
};
