import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";

export const Layout = () => {
  const location = useLocation();
  const isCheckPage = location.pathname.includes("/check");

  return (
    <div style={{ background: isCheckPage ? "#f2f2f7" : "white" }}>
      <Header />
      <div className="container d-flex flex-column h-100 text-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
