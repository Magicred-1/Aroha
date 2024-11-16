"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ChainSelector from "@/app/invest/components/ChainSelector";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { useWeb3AuthConnectorInstance } from "@/hooks/useWeb3AuthConnectorInstance";
import { IconArrowLeft, IconBrandTabler, IconSettings, IconUserBolt } from "@tabler/icons-react";
import { switchChain } from "@wagmi/core";
import { useConfig, useDisconnect } from "wagmi";

export function SidebarComponent() {
  const router = useRouter();
  const { disconnect } = useDisconnect();
  const { web3AuthInstance } = useWeb3AuthConnectorInstance();
  const config = useConfig();
  const allChains = config.chains;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const switchToAnotherChain = async (id: number) => {
    await switchChain(config, { chainId: id });
  };

  const isWeb3AuthConnected = web3AuthInstance.status === "connected";

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
      icon: <IconBrandTabler className="text-wheat h-6 w-6 flex-shrink-0" />,
      onClick: () => router.push("/"),
    },
    {
      label: "Invest",
      icon: <IconUserBolt className="text-wheat h-6 w-6 flex-shrink-0" />,
      onClick: () => router.push("/"),
    },
    {
      label: "Portfolio",
      icon: <IconSettings className="text-wheat h-6 w-6 flex-shrink-0" />,
      onClick: () => router.push("/"),
    },
    {
      label: "Logout",
      icon: <IconArrowLeft className="text-wheat h-6 w-6 flex-shrink-0" />,
      onClick: () => logout(),
    },
  ];

  return (
    <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} animate>
      <SidebarBody className="bg-gray-900 h-screen border-r border-gray-800 flex flex-col gap-6 py-6">
        {/* <ChainSelector options={allChains} onSelect={switchToAnotherChain} currentChainId={config.state.chainId} /> */}
        <div className="flex flex-col gap-2">
          {links.map((link, index) => (
            <SidebarLink key={index} link={link} className="hover:bg-gray-800 transition-colors  pl-2 pr-7 py-2 rounded-lg" />
          ))}
        </div>
      </SidebarBody>
    </Sidebar>
  );
}
