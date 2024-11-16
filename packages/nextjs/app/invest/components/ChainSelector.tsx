"use client";

import React, { useState } from "react";
import { Chain } from "wagmi/chains";
import { chainMappingId } from "@/utils/chainMapping";

type DropdownSelectorProps = {
  options: readonly [Chain, ...Chain[]];
  onSelect: (id: number) => void;
  currentChainId: number;
};

const ChainSelector = ({ options, onSelect, currentChainId }: DropdownSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSelect = (option: Chain) => {
    onSelect(option.id);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button onClick={toggleMenu} className="text-wheat py-2 rounded-md text-xs font-medium">
        {chainMappingId[currentChainId]}
        <span className="ml-2">▼</span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-48 bg-black rounded-md shadow-lg border border-gray-200">
          <ul className="py-1">
            {options.map((option, index) => (
              <li key={index} onClick={() => handleSelect(option)} className="px-4 py-2 hover:bg-wheat cursor-pointer">
                {option.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ChainSelector;
