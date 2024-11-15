/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { createContext, useContext, ReactNode } from "react";
import { IProvider } from "@web3auth/base";
import { useXRPL } from "./useXRPL";

interface XRPLChainProviderContextProps {
    provider: IProvider | null;
    isConnected: boolean;
    web3Auth: any | null;
    login: (socialProvider: string) => Promise<void>;
    loginEmailPasswordless: (email: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    loginWithApple: () => Promise<void>;
    loginWithLinkedIn: () => Promise<void>;
    disconnect: () => Promise<void>;
    switchChain: (params: { chainId: string }) => Promise<void>;
    getAllAccounts: () => Promise<any>;
    getAllBalances: () => Promise<any>;
    getUserInfo: () => Promise<any>;
    getAccounts: () => Promise<any>;
    getBalance: () => Promise<any>;
    sendTransaction: (address: string, amount: string) => Promise<void>;
    signMessage: () => Promise<void>;
}

const XRPLChainContext = createContext<XRPLChainProviderContextProps | undefined>(undefined);

export const XRPLChainProvider = ({ children }: { children: ReactNode }) => {
  const multiChainStore = useXRPL();

  return (
    <XRPLChainContext.Provider value={multiChainStore}>
      {children}
    </XRPLChainContext.Provider>
  );
};

export const useMultiChain = (): XRPLChainProviderContextProps => {
  const context = useContext(XRPLChainContext);
  if (!context) {
    throw new Error("useMultiChain must be used within a MultiChainProvider");
  }
  return context;
};