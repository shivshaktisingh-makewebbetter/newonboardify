import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { ChangeRole } from "../utils/icons";
import { ProfileOutlined, UserOutlined } from "@ant-design/icons";
import { getRole } from "../utils/helper";

export const AdminHome = () => {
  const role = getRole();

  const settingData = JSON.parse(sessionStorage.getItem("settings")) || {
    image: "https://onboardify.tasc360.com/uploads/y22.png",
    site_bg: "#ffffff",
    button_bg: "#497ed8",
    banner_bg: "#497ed8",
    banner_content:
      "Hire an attitude, not just experience and qualification. Greg Savage.",
    header_bg: "#f7f7f7",
    head_title_color: "#497ed8",
  };

  const data = [
    {
      title: "Users List",
      description:
        "Check details of all signed-up users, including their status and basic information. You can also reset passwords, delete accounts, and export the users list.",
      icon: <UserOutlined style={{ fontSize: "60px" }} />,
      buttonText: "Manage User",
      navigateKey: "userList",
    },
    {
      title: "Users Profile Settings",
      description:
        "Edit or create user profiles, including the services within each profile, by customizing the service views, request forms, and status visibility.",
      icon: <ProfileOutlined style={{ fontSize: "60px" }} />,
      buttonText: "Manage Profile",
      navigateKey: "profile",
    },
    {
      title: "Create Users",
      description:
        "Manually sign up new users, assigning them roles such as Super Admins or Admins for backend management or create regular users.",
      icon: <ChangeRole />,
      buttonText: "Manage Role",
      navigateKey: "createAdmin",
    },
  ];

  const filteredData =
    role === "superAdmin"
      ? data
      : data.filter((item) => item.title !== "Create User");

  const navigate = useNavigate();

  const handleAdminRoute = (title) => {
    navigate(title);
  };

  return (
    <>
      <div className="governify-option-list" style={{ paddingTop: "100px" }}>
        {filteredData.map((item) => {
          return (
            <div
              className="governify-option-list-repetitive"
              style={{ position: "relative", paddingBottom: "40px" }}
              key={item.title}
            >
              <div
                style={{
                  height: "6rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </div>
              <div className="governify-option-list-title font-family-hind fs-28 fw-700 mt-16 mb-16">
                {item.title}
              </div>
              <div
                className="governify-option-list-description font-family-hind fs-19 text-color-928f8f mb-16"
                style={{ minHeight: "114px", paddingBottom: "20px" }}
              >
                {item.description}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  type="primary"
                  className="border-radius-10 fs-17 fw-600 h-40"
                  style={{
                    background: settingData.button_bg,
                    color: "#fff",
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    position: "absolute",
                    bottom: "0px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleAdminRoute(item.navigateKey)}
                >
                  <span>{item.buttonText}</span>
                  <span className="fs-16">
                    <i className="bi bi-arrow-right-circle-fill"></i>
                  </span>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
