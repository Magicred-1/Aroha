/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { IProvider, WALLET_ADAPTERS } from "@web3auth/base";
import XrplRPC from "../rpc/XRPL";
import { useWeb3Auth } from "@web3auth/no-modal-react-hooks";
import { useRouter } from "next/navigation";

interface AccountData {
  chain: string;
  chainName: string;
  accounts: any[];
}

interface BalanceData {
  chain: string;
  chainName: string;
  balance: any;
}

interface MultiChainState {
  provider: IProvider | null;
  isConnected: boolean;
  web3Auth: any | null;
  login: (socialProvider: string) => Promise<void>;
  disconnect: () => Promise<void>;
  loginEmailPasswordless: (email: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithApple: () => Promise<void>;
  loginWithLinkedIn: () => Promise<void>;
  switchChain: (params: { chainId: string; }) => Promise<void>;
  getAllAccounts: () => Promise<AccountData[]>;
  getAllBalances: () => Promise<BalanceData[]>;
  getUserInfo: () => Promise<any>;
  getAccounts: () => Promise<any>;
  getBalance: () => Promise<any>;
  sendTransaction: (address: string, amount: string) => Promise<void>;
  signMessage: () => Promise<void>;
}

interface LoginInterface {
  loginProvider: string;
  extraLoginOptions: any;
}

export const useXRPL = (): MultiChainState => {
  const {
    isConnected,
    provider,
    web3Auth,
    connectTo,
    logout,
    switchChain,
    userInfo,
  } = useWeb3Auth();

  const router = useRouter();

  const login = async (socialProvider: string) => {
    const params: LoginInterface = {
      loginProvider: socialProvider,
      extraLoginOptions: {}
    };

    if (!web3Auth) {
      console.log("web3Auth not initialized yet");
      return;
    }
    await connectTo(WALLET_ADAPTERS.AUTH, params);
  };

  const loginEmailPasswordless = async (email: string) => {
    if (!web3Auth) {
      console.log("web3Auth not initialized yet");
      return;
    }

    await connectTo(WALLET_ADAPTERS.AUTH, {
      loginProvider: "email_passwordless",
      extraLoginOptions: { login_hint: email.trim() },
    });
  }

  const loginWithGoogle = async () => {
    if (!web3Auth) {
      console.log("web3Auth not initialized yet");
      return;
    }

    await connectTo(WALLET_ADAPTERS.AUTH, {
      loginProvider: "jwt",
      extraLoginOptions: {
        domain: "https://web3auth.au.auth0.com",
        verifierIdField: "sub",
        connection: "google-oauth2",
      },
    });
  }

  const loginWithLinkedIn = async () => {
    if (!web3Auth) {
      console.log("web3Auth not initialized yet");
      return;
    }

    await connectTo(WALLET_ADAPTERS.AUTH, {
      loginProvider: "jwt",
      extraLoginOptions: {
        domain: "https://web3auth.au.auth0.com",
        verifierIdField: "sub",
        connection: "linkedin",
      },
    });
  }

  const loginWithApple = async () => {
    if (!web3Auth) {
      console.log("web3Auth not initialized yet");
      return;
    }

    await connectTo(WALLET_ADAPTERS.AUTH, {
      loginProvider: "jwt",
      extraLoginOptions: {
        domain: "https://web3auth.au.auth0.com",
        verifierIdField: "sub",
        connection: "apple",
      },
    });
  }

  const disconnect = async () => {
    if (!web3Auth) {
      console.log("web3Auth not initialized yet");
      return;
    }
    await logout();
    router.push("/");
  };

  const getAllAccounts = async (): Promise<AccountData[]> => {
    if (!isConnected) {
      console.log("not connected yet");
      return [];
    }

    if (!provider) {
      console.log("provider not initialized yet");
      return [];
    }

    const xrplRPC = new XrplRPC(provider);
    const accounts = await xrplRPC.getAccounts();

    return [
      { chain: "XRPL", chainName: "XRPL Mainnet", accounts },
    ];
  };

  const getAllBalances = async (): Promise<BalanceData[]> => {
    if (!isConnected) {
      console.log("not connected yet");
      return [];
    }

    if (!provider) {
      console.log("provider not initialized yet");
      return [];
    }

    const xrplRPC = new XrplRPC(provider);
    const balance = await xrplRPC.getBalance();

    return [
      { chain: "XRPL", chainName: "XRPL Mainnet", balance },
    ];
  };

  const getUserInfo = async () => {
    if (!web3Auth) {
      console.log("web3Auth not initialized yet");
      return null;
    }

    return userInfo;
  };

  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return [];
    }

    const xrplRPC = new XrplRPC(provider);
    return await xrplRPC.getAccounts();
  };

  const getBalance = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return null;
    }

    const xrplRPC = new XrplRPC(provider);
    return await xrplRPC.getBalance();
  };

  const sendTransaction = async (address: string, amount: string) => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const xrplRPC = new XrplRPC(provider);
    const receipt = await xrplRPC.signAndSendTransaction(address, amount);
    console.log(receipt);
  };

  const signMessage = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const xrplRPC = new XrplRPC(provider);
    const signature = await xrplRPC.signMessage();
    console.log(signature);
  };

  return {
    provider,
    isConnected,
    web3Auth,
    login,
    loginEmailPasswordless,
    loginWithGoogle,
    loginWithApple,
    loginWithLinkedIn,
    disconnect,
    switchChain,
    getAllAccounts,
    getAllBalances,
    getUserInfo,
    getAccounts,
    getBalance,
    sendTransaction,
    signMessage,
  };
};
