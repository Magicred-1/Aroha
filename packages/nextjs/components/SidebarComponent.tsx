"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./ui/navbar";
import ArohaLogo from "@/app/assets/ArohaLogo.svg";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { IconArrowLeft, IconBrandTabler, IconSettings, IconUserBolt } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useAccount } from "wagmi";

export function SidebarComponent() {
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: <IconBrandTabler className="text-wheat h-7 w-7 flex-shrink-0" />,
    },
    {
      label: "Invest",
      href: "#",
      icon: <IconUserBolt className="text-wheat h-7 w-7 flex-shrink-0" />,
    },
    {
      label: "Portfolio",
      href: "#",
      icon: <IconSettings className="text-wheat h-7 w-7 flex-shrink-0" />,
    },
    {
      label: "Logout",
      href: "#",
      icon: <IconArrowLeft className="text-wheat h-7 w-7 flex-shrink-0" />,
    },
  ];
    const [sidebarOpen, setSidebarOpen] = useState(false);
    // const { isConnected } = useAccount()
    // if (!isConnected) {
    //     return null;
    // }
  return (
    <div className="h-full">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} animate >  
        <SidebarBody className="bg-gray-900 h-full flex flex-col">
          <div className="p-4">
            <Image src={ArohaLogo} height={300} width={150} alt="logo" className="mb-8" />
          </div>
          <div className="flex-1">
            {links.map((link, index) => (
              <SidebarLink key={index} link={link} />
            ))}
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}
