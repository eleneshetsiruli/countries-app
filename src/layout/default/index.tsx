import { Footer } from "@/components/footer-component/Footer";
import { Header } from "@/components/header-component/Header";

import { Outlet } from "react-router-dom";

export const DefaultLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
