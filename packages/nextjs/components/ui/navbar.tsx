import React from "react";
import Image from "next/image";
import ArohaLogo from "@/app/assets/Aroha.png";
import { Menu } from "lucide-react";

export function Navbar() {

  return (
    <nav className="h-16 bg-gray-900 border-b border-gray-800 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* <button
          onClick={() => setOpen(true)}
          className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6 text-wheat" />
        </button> */}
        <Image src={ArohaLogo} height={40} width={120} alt="logo" className="object-contain" />
      </div>
    </nav>
  );
}
