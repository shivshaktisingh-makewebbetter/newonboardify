import React, { useState } from "react";
import { Button,  Drawer,  Flex,  Typography } from "antd";
import {
  CloseOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { getRole } from "../utils/helper";

export const Header = () => {
  const data = JSON.parse(sessionStorage.getItem("settings")) || {
    image: "https://onboardify.tasc360.com/uploads/y22.png",
    site_bg: "#ffffff",
    button_bg: "#497ed8",
    banner_bg: "#497ed8",
    banner_content:
      "Hire an attitude, not just experience and qualification. Greg Savage.",
    header_bg: "#f7f7f7",
    head_title_color: "#497ed8",
  };
  const location = useLocation();
  const navigate = useNavigate();
  const [homeBUttonHovered, setHomeButtonHovered] = useState(false);
  const [settingButtonHovered, setSettingButtonHovered] = useState(false);
  const [notification, setNotification] = useState(
    sessionStorage.getItem("notification_bar") === "false" ? false : true
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  const role = getRole();

  const navigateToSettings = () => {
    navigate("settings");
  };

  const navigateToHome = () => {
    if (role === "customer") {
      navigate("/user");
    } else {
      navigate("/admin");
    }
  };

  const handleSetNotification = () => {
    setNotification(false);
    sessionStorage.setItem("notification_bar", "false");
  };

  const logoutFunction = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const handleHoverHome = (flag) => {
    if (flag) {
      setHomeButtonHovered(true);
    } else {
      setHomeButtonHovered(false);
    }
  };

  const handleHoverSetting = (flag) => {
    if (flag) {
      setSettingButtonHovered(true);
    } else {
      setSettingButtonHovered(false);
    }
  };

  return (
    <>
      {notification && (
        <div
          id="notification-banner"
          style={{ background: data.banner_bg }}
          className={`position-relative custom-banner banner text-center p-2`}
        >
          <div
            className="fs-7 banner-content text-light"
            style={{ paddingRight: "50px", paddingLeft: "50px" }}
          >
            {data.banner_content}
          </div>
          <button
            onClick={handleSetNotification}
            id="remove-n-btn"
            style={{
              position: "absolute",
              right: 0,
              margin: "3px",
              height: "calc(100% - 16px)",
            }}
            className="remove-notification text-light p-0 top-0 mx-2 fs-6 px-2 outline-0 bg-transparent border-0"
          >
            <i className="bi bi-x-circle"></i>
          </button>
        </div>
      )}
      <header
        className="header-bar mb-auto mb-3"
        style={{ background: data.header_bg }}
      >
        <div className="container h-100 p-3 py-2 mx-auto">
          <div className="onboardify-header-container">
          <div className="governify-header-major-div">
            <div className="governify-header-major-div-logo">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToHome();
                }}
                className="text-decoration-none"
              >
                <span className="header-logo float-md-start">
                  <img
                    height="80"
                    alt="TASC logo"
                    src={sessionStorage.getItem("logo") === null ? sessionStorage.getItem("logo_location") : sessionStorage.getItem("logo") }
                  />
                </span>
              </a>
            </div>
            <Typography className="d-none d-sm-flex d-md-flex d-lg-flex d-xl-flex d-xxl-flex">
              <span className="onboardify-welcome">Welcome</span>{" "}
              <span className="onboardify-welcome-text-hani">
                {sessionStorage.getItem("userName")}
              </span>
            </Typography>
          </div>
          <div className="governify-header-major-div-buttons d-none d-sm-flex d-md-flex d-lg-flex d-xl-flex d-xxl-flex">
            <div className="governify-header-buttons">
              {role === "customer" ? (
                location.pathname.includes("user") ? (
                  <Button
                    className="governify-secondary-btn border-radius-10"
                    style={{
                      display: "flex",
                      gap: "5px",
                      alignItems: "center",
                      border: homeBUttonHovered
                        ? `1px solid #928f8f`
                        : `1px solid ${data.button_bg}`,
                      color: homeBUttonHovered ? `#928f8f` : data.button_bg,
                      background: "transparent",
                    }}
                    onClick={navigateToHome}
                    onMouseEnter={() => handleHoverHome(true)}
                    onMouseLeave={() => handleHoverHome(false)}
                  >
                    <span className="font-family-montse fs-12 fw-700">
                      Home
                    </span>
                    <HomeOutlined className="fs_20 fw-700" />
                  </Button>
                ) : (
                  <></>
                )
              ) : (
                <Button
                  className="governify-secondary-btn fs_12 fw-700 border-radius-10"
                  style={{
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                    border: settingButtonHovered
                      ? `1px solid #928f8f`
                      : `1px solid ${data.button_bg}`,
                    color: settingButtonHovered ? `#928f8f` : data.button_bg,
                    background: "transparent",
                  }}
                  onClick={navigateToSettings}
                  onMouseEnter={() => handleHoverSetting(true)}
                  onMouseLeave={() => handleHoverSetting(false)}
                >
                  <span className="font-family-montse fs-12 fw-700">
                    Settings
                  </span>
                  <SettingOutlined className="fs_20 fw-700" />
                </Button>
              )}

              <Button
                type="primaary"
                className="governify-primary-btn border-radius-10"
                style={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                  background: data.button_bg,
                  color: "#fff",
                }}
                onClick={logoutFunction}
              >
                <span className="font-family-montse fs-12 fw-700">Log out</span>
                <LogoutOutlined className="fs_20" />
              </Button>
            </div>
          </div>
          </div>
          <div className="d-block d-sm-none d-md-none d-lg-none d-xl-none d-xxl-none lh-1">
            <MenuOutlined
              style={{ color: data.button_bg, fontSize: "20px" }}
              onClick={() => setOpenDrawer(true)}
            />
          </div>
        </div>


      </header>

      <Drawer
        title={
          <Flex justify="space-between">
            <span>Welcome, {sessionStorage.getItem("userName")}</span>{" "}
            <CloseOutlined
              onClick={() => setOpenDrawer(false)}
              style={{ cursor: "pointer" }}
            />{" "}
          </Flex>
        }
        placement="right"
        closable={false}
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        width="90%"
        key="right"
      >
        <Flex align="start" vertical gap={10}>
          <Button
            type="text"
            onClick={() => {
              setOpenDrawer(false);
              // setIsHelpModalOpen(!isHelpModalOpen);
            }}
          >
            Book a meeting
          </Button>
          <Button
            type="text"
            onClick={() => {
              // setLoading(true);
              setOpenDrawer(false);
              // setTimeout(() => {
              //   setLoading(false);
              //   removeSessions();
              //   navigate("/signin");
              // }, 3000);
            }}
          >
            Logout
          </Button>
        </Flex>
      </Drawer>
    </>
  );
};
