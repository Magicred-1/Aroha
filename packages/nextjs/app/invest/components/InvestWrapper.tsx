import React from "react";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { tokenList } from "@/app/dashboard/data/tokenList";

const InvestWrapper = () => {
  return (
    <div className="max-w-5xl mx-auto px-8 my-12">
      <h1 className="text-4xl">Assets</h1>
      <HoverEffect items={tokenList} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10" />
    </div>
  );
};

export default InvestWrapper;
