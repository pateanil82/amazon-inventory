import React, { useLayoutEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import UserProfileRegular from "../pages/UserProfileRegular";
import UserProfileSetting from "../pages/UserProfileSetting";
import Homepage from "../pages/Homepage";
import Error404Modern from "../pages/error/404-modern";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Success from "../pages/auth/Success";

import Layout from "../layout/Index";
import LayoutNoSidebar from "../layout/Index-nosidebar";
import ForecastingPage from "../pages/ForecastingPage";
import OrdersPage from "../pages/OrdersPage";
import ShipmentsPage from "../pages/ShipmentsPage";
import ProductsPage from "../pages/ProductsPage";
import PrivateRoute from "./PrivateRoute";
import AccountsPage from "../pages/AccountsPage";
import PrivetRouteForSuccess from "./PrivetRouteForSuccess";

const Router = () => {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="login" />} />

        <Route path="/" element={<PrivateRoute/>}>
        <Route path="dashboard" element={<Homepage />}></Route>
        <Route path="forecasting" element={<ForecastingPage />}></Route>
        <Route path="orders" element={<OrdersPage />}></Route>
        <Route path="shipments" element={<ShipmentsPage />}></Route>
        <Route path="products" element={<ProductsPage />}></Route>
        <Route path="profile" element={<UserProfileRegular />}></Route>
        <Route path="accounts" element={<AccountsPage/>}></Route>
        <Route path="settings" element={<UserProfileSetting />}></Route>
        </Route>
        
      </Route>

      <Route path="/" element={<LayoutNoSidebar />}>
        <Route path="/" element={<PrivetRouteForSuccess/>}>
        <Route path="success" element={<Success />}></Route>
        </Route>
        <Route path="reset-password" element={<ForgotPassword />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="login" element={<Login />}></Route>

        <Route path="errors">
          <Route path="404" element={<Error404Modern />}></Route>
        </Route>
        <Route path="*" element={<Error404Modern />}></Route>

      </Route>
    </Routes>
  );
};
export default Router;
