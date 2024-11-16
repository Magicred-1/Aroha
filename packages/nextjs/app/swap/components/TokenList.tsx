import React from "react";
import { TokenBalance } from "./TokenBalance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SwapWidget, Theme, darkTheme } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";
import { Loader2 } from "lucide-react";
import { erc20Abi } from "viem";
import { useAccount, useBalance, useContractReads, useReadContracts } from "wagmi";


export const TokenList = () => {
  const { address: userAddress, isConnected } = useAccount();

 
  const { data: ethBalance, isLoading: ethLoading } = useBalance({
    address: userAddress,
  });


  const tokenAddresses = [
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // WETH
    "0x6B175474E89094C44Da98b954EedeAC495271d0F", // DAI
    "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", // WBTC
  ] as const;

  const { data: tokenData, isPending: tokensLoading } = useReadContracts({
    contracts: tokenAddresses.flatMap(address => [
      {
        abi: erc20Abi,
        address: address as `0x${string}`,
        functionName: "balanceOf",
        args: [userAddress as `0x${string}`],
      },
      {
        abi: erc20Abi,
        address: address as `0x${string}`,
        functionName: "symbol",
      },
      {
        abi: erc20Abi,
        address: address as `0x${string}`,
        functionName: "name",
      },
      {
        abi: erc20Abi,
        address: address as `0x${string}`,
        functionName: "decimals",
      },
    ]),
    query: {
      enabled: Boolean(userAddress),
    },
  });

  const processTokenData = () => {
    if (!tokenData) return [];

    const tokens = [];
    for (let i = 0; i < tokenData.length; i += 4) {
      const balance = tokenData[i].result;
      const symbol = tokenData[i + 1].result;
      const name = tokenData[i + 2].result;
      const decimals = tokenData[i + 3].result;

      if (balance && symbol && name && decimals) {
        tokens.push({
          address: tokenAddresses[i / 4],
          balance,
          symbol,
          name,
          decimals,
        });
      }
    }
    return tokens;
  };

  const tokens = processTokenData();
  const isLoading = ethLoading || tokensLoading;

  return (
    <Card className="w-full max-w-md bg-gray-900 text-white">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Wallet Tokens
          {isLoading && <Loader2 className="h-4 w-4 animate-spin text-gray-400" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isConnected ? (
          <div className="text-gray-400">Please connect your wallet</div>
        ) : tokens.length === 0 && !ethBalance && !isLoading ? (
          <div className="text-gray-400">No tokens found</div>
        ) : (
          <div className="space-y-4">
            {/* Native ETH Balance */}
            {ethBalance && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">Ξ</div>
                  <div>
                    <div className="font-medium">ETH</div>
                    <div className="text-sm text-gray-400">Ethereum</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{Number(ethBalance.formatted).toFixed(6)}</div>
                  <div className="text-sm text-gray-400">${(Number(ethBalance.formatted) * 1).toFixed(2)}</div>
                </div>
              </div>
            )}

            {tokens.map(token => (
              <TokenBalance key={token.address} token={token} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};