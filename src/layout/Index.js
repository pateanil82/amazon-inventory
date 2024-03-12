import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import AppRoot from "./global/AppRoot";
import AppMain from "./global/AppMain";
import AppWrap from "./global/AppWrap";

const Layout = ({ title, ...props }) => {
  return (
    <AppRoot>
      <AppMain>
        <Sidebar fixed />
        <AppWrap>
          <Header fixed />
          <Outlet />
          <Footer />
        </AppWrap>
      </AppMain>
    </AppRoot>
  );
};
export default Layout;
