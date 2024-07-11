import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div>
      <Header />
      <div className="container d-flex flex-column h-100 text-center">
      <Outlet/>
      </div>
      <Footer />
    </div>
  );
};
