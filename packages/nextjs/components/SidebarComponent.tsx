"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IconArrowLeft, IconBrandTabler, IconSettings, IconUserBolt } from "@tabler/icons-react";
import { switchChain } from "@wagmi/core";
import { motion } from "framer-motion";
import { polygonAmoy } from "viem/chains";
import { useConfig, useDisconnect } from "wagmi";
import { useAccount } from "wagmi";
import ArohaLogo from "@/app/assets/ArohaLogo.svg";
import ChainSelector from "@/app/invest/components/ChainSelector";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { useWeb3AuthConnectorInstance } from "@/hooks/useWeb3AuthConnectorInstance";

export function SidebarComponent() {
  const router = useRouter();
  const { disconnect } = useDisconnect();
  const { web3AuthInstance } = useWeb3AuthConnectorInstance();

  const config = useConfig();
  const allChains = config.chains;

  const switchToAnotherChain = async (id: number) => {
    await switchChain(config, { chainId: id });
  };

  const isWeb3AuthConnected = web3AuthInstance && web3AuthInstance.status === "connected";

  const logout = async () => {
    if (isWeb3AuthConnected) {
      await web3AuthInstance.logout();
    }
    disconnect();
    router.push("/");
  };

  const links = [
    {
      label: "Dashboard",
      icon: <IconBrandTabler className="text-wheat h-7 w-7 flex-shrink-0" />,
      onClick: () => router.push("/dashboard"),
    },
    {
      label: "Invest",
      icon: <IconUserBolt className="text-wheat h-7 w-7 flex-shrink-0" />,
      onClick: () => router.push("/invest"),
    },
    {
      label: "Portfolio",
      icon: <IconSettings className="text-wheat h-7 w-7 flex-shrink-0" />,
      onClick: () => router.push("/"),
    },
    {
      label: "Logout",
      icon: <IconArrowLeft className="text-wheat h-7 w-7 flex-shrink-0" />,
      onClick: () => logout(),
    },
  ];
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const { isConnected } = useAccount()
  // if (!isConnected) {
  //     return null;
  // }
  return (
    <>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} animate>
        <SidebarBody className="bg-gray-900 h-full">
          <Image src={ArohaLogo} height={300} width={150} alt="logo" />
          {/* <ChainSelector options={allChains} onSelect={switchToAnotherChain} currentChainId={config.state.chainId} /> */}
          {links.map((link, index) => (
            <SidebarLink key={index} link={link} className="" />
          ))}
        </SidebarBody>
      </Sidebar>
    </>
  );
}
