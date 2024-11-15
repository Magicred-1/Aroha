"use client";

import { web3AuthContextConfig } from "./config";
import { Web3AuthProvider } from "@web3auth/no-modal-react-hooks";
import { XRPLChainProvider } from "../XRPLProvider/XRPLWrapper";
import { Toaster } from "sonner";

export default function MainProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Web3AuthProvider config={web3AuthContextConfig}>
      <Toaster />
        <XRPLChainProvider>
          {children}
        </XRPLChainProvider>
    </Web3AuthProvider>
  );
}