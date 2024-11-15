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
  return (
    <>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} animate>
        <SidebarBody className="bg-gray-900 h-full">
          <Image src={ArohaLogo} height={300} width={150} alt="logo" />
          {links.map((link, index) => (
            <SidebarLink key={index} link={link} className="" />
          ))}
        </SidebarBody>
      </Sidebar>
    </>
  );
}
