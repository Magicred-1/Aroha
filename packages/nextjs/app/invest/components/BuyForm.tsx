import { useState } from "react";
import { AnimatedGridPattern } from "@/components/ui/animatedGridPattern";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2, Wallet, X } from "lucide-react";

const BuyForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");

  const tokenData = {
    name: "ISO Token",
    symbol: "ISO",
    userBalance: "1000",
    price: "0.01",
    maxPurchase: "10000",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="relative w-full max-w-lg mx-auto"
    >
      <div className="">
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-wheat to-wheat/80 bg-clip-text text-transparent">
              Purchase {tokenData.name}
            </h2>
            <div className="flex items-center justify-center gap-2 text-wheat/60">
              <Wallet className="w-4 h-4" />
              <span>
                Your Balance: {tokenData.userBalance} {tokenData.symbol}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between text-sm text-wheat/80">
              <span>Amount to Purchase</span>
              <span>Price: {tokenData.price} ETH per token</span>
            </div>

            <div className="relative">
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full bg-black/30 border-gray-800 rounded-xl pr-16 text-wheat placeholder:text-wheat/40 focus:ring-wheat/20"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-wheat/60">
                {tokenData.symbol}
              </span>
            </div>

            <div className="flex justify-between text-sm text-wheat/60">
              <span>Max: {tokenData.maxPurchase}</span>
              <span>Total: {amount ? (Number(amount) * Number(tokenData.price)).toFixed(4) : "0"} ETH</span>
            </div>

            <Button
              className="w-full bg-wheat/10 hover:bg-wheat/20 text-wheat border border-wheat/20 rounded-xl h-12 transition-all duration-200 shadow-lg shadow-wheat/5"
              onClick={() => setIsLoading(true)}
              disabled={isLoading || !amount}
            >
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
          </div>
        </div>
      </div>

    </motion.div>
  );
};

export default BuyForm;
