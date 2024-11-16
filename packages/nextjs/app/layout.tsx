import { Footer } from "@/components/Footer";
import { Providers } from "@/components/web3auth/provider/providers";
import "@/styles/globals.css";

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <body>
        <Providers>
          <div className="flex flex-col h-screen">
            <div className="flex flex-1">
              <SidebarComponent />
              <main className="flex-1 p-6 bg-gradient-to-l from-gray-900 to-black">{children}</main>
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
