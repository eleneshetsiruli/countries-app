import { ReactNode } from "react";
import { Footer } from "../components/footer-component/Footer";
import { Header } from "../components/header-component/Header";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
