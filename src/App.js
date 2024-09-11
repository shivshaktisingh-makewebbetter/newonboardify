import "./App.css";
import "react-multi-carousel/lib/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import { ConfigProvider } from "antd";
import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
import { Login } from "./auth/Login";
import { ForgotPassword } from "./auth/ForgotPassword";
import { UserHome } from "./user/UserHome";
import { Track } from "./user/Track";
import { Check } from "./user/Check";
import { Request } from "./user/Request";
import { AdminHome } from "./admin/AdminHome";
import { CreateAdmin } from "./admin/CreateAdmin";
import { ProtectedRoute } from "./routeWrapper/ProtectedRoute";
import { Register } from "./auth/Register";
import { Layout } from "./layout/Layout";
import { UserList } from "./admin/UserList";
import { TrackDetails } from "./user/TrackDetailsPage";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ResetPassword from "./auth/ResetPassword";
import VerifyUser from "./auth/VerifyUser";
import ErrorBoundary from "./error/ErrorBoundary";
import ErrorPage from "./common/ErrorPage";
import { Profile } from "./admin/Profile";
import { CreateProfile } from "./admin/components/CreateProfile";
import { EditProfile } from "./admin/components/EditProfile";
import { GeneralSettings } from "./admin/GeneralSettings";
import { ReportSettings } from "./admin/ReportSetting";
import { ComplianceReportSettings } from "./admin/ComplianceReportSettings";
import { ServiceReportSettings } from "./admin/ServiceReportSettings";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: (
        <ErrorBoundary>
          <Login />
        </ErrorBoundary>
      ),
    },
    {
      path: "register",
      element: (
        <ErrorBoundary>
          <Register />
        </ErrorBoundary>
      ),
    },
    {
      path: "forgot",
      element: (
        <ErrorBoundary>
          <ForgotPassword />
        </ErrorBoundary>
      ),
    },
    {
      path: "reset-password",
      element: (
        <ErrorBoundary>
          <ResetPassword />
        </ErrorBoundary>
      ),
    },
    {
      path: "onboardify/verify",
      element: (
        <ErrorBoundary>
          <VerifyUser />
        </ErrorBoundary>
      ),
    },
    {
      path: "user",
      element: <Layout />,
      children: [
        {
          path: "",
          element: (
            <ProtectedRoute
              element={
                <ErrorBoundary>
                  <UserHome />
                </ErrorBoundary>
              }
              allowedRoles={["customer"]}
            />
          ),
        },
        {
          path: "track",
          element: (
            <ProtectedRoute
              element={
                <ErrorBoundary>
                  <Track />
                </ErrorBoundary>
              }
              allowedRoles={["customer"]}
            />
          ),
        },
        {
          path: "track/details",
          element: (
            <ProtectedRoute
              element={
                <ErrorBoundary>
                  <TrackDetails />
                </ErrorBoundary>
              }
              allowedRoles={["customer"]}
            />
          ),
        },
        {
          path: "check",
          element: (
            <ProtectedRoute
              element={
                <ErrorBoundary>
                  <Check />
                </ErrorBoundary>
              }
              allowedRoles={["customer"]}
            />
          ),
        },
        {
          path: "request",
          element: (
            <ProtectedRoute
              element={
                <ErrorBoundary>
                  <Request />
                </ErrorBoundary>
              }
              allowedRoles={["customer"]}
            />
          ),
        },
      ],
    },
    {
      path: "admin",
      element: <Layout />,
      children: [
        {
          path: "",
          element: (
            <ProtectedRoute
              element={
                <ErrorBoundary>
                  <AdminHome />
                </ErrorBoundary>
              }
              allowedRoles={["superAdmin", "admin"]}
            />
          ),
        },

        {
          path: "createAdmin",
          element: (
            <ProtectedRoute
              element={
                <ErrorBoundary>
                  <CreateAdmin />
                </ErrorBoundary>
              }
              allowedRoles={["superAdmin", "admin"]}
            />
          ),
        },
        {
          path: "generalSettings",
          element: (
            <ProtectedRoute
              element={
                <ErrorBoundary>
                  <GeneralSettings />
                </ErrorBoundary>
              }
              allowedRoles={["superAdmin", "admin"]}
            />
          ),
        },
        {
          path: "reportSettings",
          element: (
            <ProtectedRoute
              element={
                <ErrorBoundary>
                  <ReportSettings />
                </ErrorBoundary>
              }
              allowedRoles={["superAdmin", "admin"]}
            />
          ),
        },
        {
          path: "complianceReport",
          element: (
            <ProtectedRoute
              element={
                <ErrorBoundary>
                  <ComplianceReportSettings />
                </ErrorBoundary>
              }
              allowedRoles={["superAdmin", "admin"]}
            />
          ),
        },
        {
          path: "serviceReport",
          element: (
            <ProtectedRoute
              element={
                <ErrorBoundary>
                  <ServiceReportSettings />
                </ErrorBoundary>
              }
              allowedRoles={["superAdmin", "admin"]}
            />
          ),
        },
        {
          path: "userList",
          element: (
            <ProtectedRoute
              element={
                <ErrorBoundary>
                  <UserList />
                </ErrorBoundary>
              }
              allowedRoles={["superAdmin", "admin"]}
            />
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute
              element={
                <ErrorBoundary>
                  <Profile />
                </ErrorBoundary>
              }
              allowedRoles={["superAdmin", "admin"]}
            />
          ),
        },
        {
          path: "createprofile",
          element: (
            <ProtectedRoute
              element={
                <ErrorBoundary>
                  <CreateProfile />
                </ErrorBoundary>
              }
              allowedRoles={["superAdmin", "admin"]}
            />
          ),
        },
        {
          path: "editprofile",
          element: (
            <ProtectedRoute
              element={
                <ErrorBoundary>
                  <EditProfile />
                </ErrorBoundary>
              }
              allowedRoles={["superAdmin", "admin"]}
            />
          ),
        },
      ],
    },
    { path: "*", element: <ErrorPage /> },
  ]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#497ed8",
            headerColor: "#f0f0f0",
          },
          Card: {
            headerBg: "#497ed8",
          },
        },
      }}
    >
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ConfigProvider>
  );
}

export default App;
