"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { Config, WagmiProvider, createConfig, http } from "wagmi";
import { polygonAmoy, sepolia, unichainSepolia } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";
import { useWeb3AuthConnectorInstance } from "@/hooks/useWeb3AuthConnectorInstance";

type ProvidersProps = {
  children: ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  const [wagmiConfig, setWagmiConfig] = useState<Config | null>(null);

  const queryClient = new QueryClient();
  const { web3AuthInstance } = useWeb3AuthConnectorInstance();

  useEffect(() => {
    const web3AuthConnector = Web3AuthConnector({
      web3AuthInstance: web3AuthInstance,
      loginParams: {
        loginProvider: "google",
      },
    });

    const config = createConfig({
      chains: [sepolia, polygonAmoy, unichainSepolia],
      transports: {
        [sepolia.id]: http(),
        [polygonAmoy.id]: http(),
        [unichainSepolia.id]: http(),
      },
      connectors: [metaMask(), web3AuthConnector],
    });

    setWagmiConfig(config);
  }, []);

  if (!wagmiConfig) {
    return <div>Loading...</div>;
  }

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};
