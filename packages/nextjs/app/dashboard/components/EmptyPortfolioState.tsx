import React from "react";
import { Card } from "@/components/ui/card";
import { Wallet } from "lucide-react";

const EmptyPortfolioState = () => {
  return (
    <div className="w-full h-[80vh] flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-gray-900 border-gray-800 border-wheat/40">
        <div className="p-8 text-center space-y-6">
          <div className="mx-auto w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center border-wheat/40">
            <Wallet className="w-8 h-8 text-gray-400" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Add Your First Asset</h3>
            <p className="text-gray-400 text-sm">
              Start tracking your portfolio by connecting your accounts or manually adding your assets.
            </p>
          </div>

          <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium">
            Connect Account
          </button>

          <button className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 font-medium">
            Add Asset Manually
          </button>
        </div>
      </Card>
    </div>
  );
};

export default EmptyPortfolioState;
