import PageLayout from "@/components/PageLayout";
import "@/styles/globals.css";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
<PageLayout>{children}</PageLayout>
  );
};

export default DashboardLayout;
