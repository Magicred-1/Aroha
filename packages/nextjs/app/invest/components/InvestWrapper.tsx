import React from "react";
import { chains } from "../constants";
import { HoverEffect } from "@/components/ui/card-hover-effect";

const InvestWrapper = () => {
  return (
      <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-[24px] text-wheat font-bold my-2">Marketplace</h1>
  <HoverEffect items={chains} />
</div>
  );
};

export default InvestWrapper;
