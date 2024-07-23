import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { useEffect } from "react";
import { ConfigProvider } from "antd";
import "react-quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
import { Login } from "./auth/Login";
import { ForgotPassword } from "./auth/ForgotPassword";
import { CreatePassword } from "./auth/CreatePassword";
import { UserHome } from "./user/UserHome";
import { Track } from "./user/Track";
import { Check } from "./user/Check";
import { Request } from "./user/Request";
import { AdminHome } from "./admin/AdminHome";
import { Board } from "./admin/Board";
import { CreateAdmin } from "./admin/CreateAdmin";
import { Settings } from "./admin/Settings";
import { ProtectedRoute } from "./routeWrapper/ProtectedRoute";
import { ErrorPage } from "./error/ErrorPage";
import { Register } from "./auth/Register";
import { Layout } from "./layout/Layout";
import { UserList } from "./admin/UserList";
import { TrackDetails } from "./user/TrackDetailsPage";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ResetPassword from "./auth/ResetPassword";

function App() {
  // useEffect(() => {
  //   sessionStorage.setItem(
  //     "token",
  //     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvY29tbW9tLWxvZ2luIiwiaWF0IjoxNzIxMzkwMDU1LCJleHAiOjE3MjE2NDkyNTUsIm5iZiI6MTcyMTM5MDA1NSwianRpIjoiY2NYa1lZQzZab2pJUVRyYSIsInN1YiI6IjEzIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.Tftfw_9Mca_2C_ctCR6spHFCg2oc_b32EiXyA7-1D9k"
  //   );
  // }, []);
  const router = createBrowserRouter([
    { path: "", element: <Login /> },
    { path: "register", element: <Register /> },
    { path: "forgot", element: <ForgotPassword /> },
    { path: "reset-password", element: <ResetPassword /> },
    {
      path: "user",
      element: <Layout />,
      children: [
        {
          path: "",
          element: (
            <ProtectedRoute element={<UserHome />} allowedRoles={["user"]} />
          ),
        },
        {
          path: "track",
          element: (
            <ProtectedRoute element={<Track />} allowedRoles={["user"]} />
          ),
        },
        {
          path: "track/details",
          element: (
            <ProtectedRoute
              element={<TrackDetails />}
              allowedRoles={["user"]}
            />
          ),
        },
        {
          path: "check",
          element: (
            <ProtectedRoute element={<Check />} allowedRoles={["user"]} />
          ),
        },
        {
          path: "request",
          element: (
            <ProtectedRoute element={<Request />} allowedRoles={["user"]} />
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
          element: <ProtectedRoute element={<AdminHome />} roles={["admin"]} />,
        },
        {
          path: "board",
          element: <ProtectedRoute element={<Board />} roles={["admin"]} />,
        },
        {
          path: "createAdmin",
          element: (
            <ProtectedRoute element={<CreateAdmin />} roles={["admin"]} />
          ),
        },
        {
          path: "settings",
          element: <ProtectedRoute element={<Settings />} roles={["admin"]} />,
        },
        {
          path: "userList",
          element: <ProtectedRoute element={<UserList />} roles={["admin"]} />,
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
      <Provider  store={store}>
      <RouterProvider router={router} />
      </Provider>
    </ConfigProvider>
  );
}

export default App;
