
import { Footer } from "@/components/Footer";
import { SidebarComponent } from "@/components/SidebarComponent";
import MainProvider from "@/components/web3auth/MainProvider";
import "@/styles/globals.css";
import { getMetadata } from "@/utils/scaffold-eth/getMetadata";
import "@rainbow-me/rainbowkit/styles.css";
import {
  hederaTestnet,
  lineaSepolia,
  rootstockTestnet,
  scrollSepolia,
  unichainSepolia,
  zircuitTestnet,
} from "viem/chains";

export const metadata = getMetadata({ title: "Scaffold-ETH 2 App", description: "Built with 🏗 Scaffold-ETH 2" });

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <body>
        <MainProvider>
          <div className="flex h-screen">
            <SidebarComponent />

            <div className="flex-1 p-6 bg-gradient-to-l from-gray-900 to-black">{children}</div>
            
          </div>
          <Footer/>
        </MainProvider>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
