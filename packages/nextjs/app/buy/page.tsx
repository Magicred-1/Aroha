"use client"
import { useState } from "react";
import { AnimatedGridPattern } from "@/components/ui/animatedGridPattern";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ArrowRight, Loader2, Wallet } from "lucide-react";

const TokenPurchaseForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");

  // Mock data - replace with actual data from your application
  const tokenData = {
    name: "ISO Token",
    symbol: "ISO",
    userBalance: "1000",
    price: "0.01",
    maxPurchase: "10000",
  };

  const handlePurchase = async () => {
    setIsLoading(true);
    // Add your purchase logic here
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
  
      <Card className="w-full max-w-md mx-4 bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/90 border-opacity-40">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-wheat">Purchase {tokenData.name}</CardTitle>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Wallet className="w-4 h-4" />
            <span>
              Your Balance: {tokenData.userBalance} {tokenData.symbol}
            </span>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Amount to Purchase</span>
              <span>Price: {tokenData.price} ETH per token</span>
            </div>
            <div className="relative">
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="pr-16"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                {tokenData.symbol}
              </span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Max: {tokenData.maxPurchase}</span>
              <span>Total: {amount ? (Number(amount) * Number(tokenData.price)).toFixed(4) : "0"} ETH</span>
            </div>
          </div>

          <Button className="w-full font-semibold" onClick={handlePurchase} disabled={isLoading || !amount}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Buy {tokenData.symbol}
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </CardContent>
      </Card>

  );
};

export default TokenPurchaseForm;
