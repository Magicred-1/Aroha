import { SidebarComponent } from "@/components/SidebarComponent";

const InvestLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      {/* <SidebarComponent /> */}
      <div className="flex-1 bg-gradient-to-l from-gray-900 to-black">{children}</div>
    </div>
  );
};

export default InvestLayout;
