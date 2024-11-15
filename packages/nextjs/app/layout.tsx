import { Footer } from "@/components/Footer";
import { SidebarComponent } from "@/components/SidebarComponent";
import { Providers } from "@/components/web3auth/provider/providers";
import "@/styles/globals.css";

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <body>
        <Providers>
          <div className="flex h-screen">
            <div className="flex-1 bg-gradient-to-l from-gray-900 to-black">{children}</div>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
