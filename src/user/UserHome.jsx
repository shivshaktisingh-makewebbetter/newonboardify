import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import {
  OverallStatusIcon,
  RequestOnboardIcon,
  TrackOnboardIcon,
} from "../utils/icons";
import { SubHeader } from "../components/SubHeader";
import { useEffect } from "react";
import { getLoginUserDetails } from "../apiservice/ApiService";

export const UserHome = () => {
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
      title: "Request Onboarding",
      description:
        "Streamline your employee onboarding with TASC Outsourcing. Request here for a hassle-free experience, letting us handle the rest with care and efficiency.",
      icon: <RequestOnboardIcon />,
      buttonText: "Request",
      navigateKey: "request",
    },
    {
      title: "Track Onboarding",
      description:
        "Track your onboarding requests seamlessly with us. Stay updated on the progress of your employee onboarding journey. Effortless tracking for a smoother onboarding experience.",
      icon: <TrackOnboardIcon />,
      buttonText: "Track",
      navigateKey: "track",
    },
    {
      title: "Overall Status",
      description:
        "Stay in the loop with ease! Check the overall status of your onboarding requests and keep tabs on your employee onboarding progress for a comprehensive overview of the entire process.",
      icon: <OverallStatusIcon />,
      buttonText: "Check",
      navigateKey: "check",
    },
  ];

  const navigate = useNavigate();

  const handleAdminRoute = (title) => {
    navigate(title);
  };

  const newHelper = async () => {
    const response = await getLoginUserDetails(sessionStorage.getItem("token"));
    // console.log(response, "response");
    sessionStorage.setItem("userEmail", "userone@gmail.com");
    sessionStorage.setItem("userName", "user");
    sessionStorage.setItem("userId", 34);
  };

  useEffect(() => {
    newHelper();
  }, []);

  return (
    <>
      <SubHeader />
      <div className="governify-option-list">
        {data.map((item) => {
          return (
            <div
              className="governify-option-list-repetitive"
              style={{ position: "relative", paddingBottom: "40px" }}
              key={item.navigateKey}
            >
              <div style={{ height: "6rem" }}>{item.icon}</div>
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
                    cursor:"pointer"
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
