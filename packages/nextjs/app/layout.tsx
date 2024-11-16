
import { Footer } from "@/components/Footer";
import { SidebarComponent } from "@/components/SidebarComponent";
import { Navbar } from "@/components/ui/navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Providers } from "@/components/web3auth/provider/providers";
import "@/styles/globals.css";


const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {

  return (
    <html suppressHydrationWarning>
      <body>
        <Providers>
          <SidebarProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <div className="flex flex-1 overflow-hidden">
                <SidebarComponent />
                <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-l from-gray-900 to-black">{children}</main>
              </div>
              <Footer />
            </div>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;