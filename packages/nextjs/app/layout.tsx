import { ScaffoldEthAppWithProviders } from "@/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "@/components/ThemeProvider";
import MainProvider from "@/components/web3auth/MainProvider";
import "@/styles/globals.css";
import { getMetadata } from "@/utils/scaffold-eth/getMetadata";
import "@rainbow-me/rainbowkit/styles.css";

export const metadata = getMetadata({ title: "Scaffold-ETH 2 App", description: "Built with 🏗 Scaffold-ETH 2" });

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <body>
        <MainProvider>
              {children}
          </MainProvider>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
