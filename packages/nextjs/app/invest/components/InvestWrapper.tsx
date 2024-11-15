import React from "react";
import { chains } from "../constants";
import { HoverEffect } from "@/components/ui/card-hover-effect";

const InvestWrapper = () => {
  return (
    <div className="max-w-5xl mx-auto px-8 my-12">
      <HoverEffect items={chains} className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10" />
    </div>
  );
};

export default InvestWrapper;
