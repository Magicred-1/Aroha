"use client";

import React from "react";
import { TokenList } from "./components/TokenList";
import { SwapWidget, Theme, darkTheme } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";

const page = () => {
  const myDarkTheme: Theme = {
    ...darkTheme,
    accent: "#2172E5",
    primary: "#FFFFFF",
    secondary: "#888D9B",
    fontFamily: '"Lexend"',
  };
  const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  return (
    <div className=" w-full pt-[10%] flex justify-center gap-10 p-6 my-auto">
      <TokenList />
      <div className="Uniswap">
        <SwapWidget
                  theme={myDarkTheme}
                  width={'450px'}
          tokenList="https://ipfs.io/ipns/tokens.uniswap.org"
          defaultInputTokenAddress={USDC}
        />
      </div>
    </div>
  );
};

export default page;
