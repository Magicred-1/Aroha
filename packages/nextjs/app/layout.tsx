import { Providers } from "@/components/web3auth/provider/providers";
import "@/styles/globals.css";

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
