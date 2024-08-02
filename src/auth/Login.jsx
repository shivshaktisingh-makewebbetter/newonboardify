import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader } from "../common/Loader";
import {
  getCustomerGeneralSettings,
  getGeneralSettingsData,
  getLoginUserDetails,
  loginApi,
} from "../apiservice/ApiService";
import { isTokenValid } from "../utils/helper";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [animation, setAnimation] = useState(true);
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(location.search);
  let adminToken = queryParameters.get("token");
  let tascRole = queryParameters.get("role");
  let id = queryParameters.get("id");
  let path = queryParameters.get("path");

  const handleSubmit = async () => {
    let payload = JSON.stringify({
      email: userDetails.email,
      password: userDetails.password,
      domain: window.location.origin,
    });

    try {
      setLoading(true);
      const response = await loginApi(payload);
      if (response.success) {
        toast.success("Logged In Successfull.");
        sessionStorage.setItem("token", response.data.token);
        const response2 = await getCustomerGeneralSettings(response.data.role);

        // console.log(response1)
        if (response2.success) {
          // console.log(response2)
          sessionStorage.setItem(
            "settings",
            response2.data.response.ui_settings
          );
          sessionStorage.setItem(
            "logo_location",
            response2.data.response.logo_location
          );
        }
        setRole(response.data.role);
        setToken(response.data.token);
        sessionStorage.setItem("role", response.data.role);
        const response1 = await getLoginUserDetails(response.data.token);
        if (response1.success) {
          sessionStorage.setItem("userEmail", response1.data.data.email);
          sessionStorage.setItem("userName", response1.data.data.name);
          sessionStorage.setItem("userId", response1.data.data.user_id);
        }
        if (response.data.role === "customer") {
          setTimeout(() => {
            navigate("/user");
          }, 1000);
        } else {
          navigate("/admin");
        }
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.log(err, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleChangeUserDetails = (e, filter) => {
    setUserDetails({ ...userDetails, [filter]: e.target.value });
  };

  const checkEmailIsFilledAndValid = () => {
    const email = userDetails.email;
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/;
    if (email && emailRegex.test(email)) {
      return false;
    }
    return true;
  };

  const checkPasswordIsFilledValid = () => {
    const password = userDetails.password;
    if (password.length > 5) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    setTimeout(() => {
      setAnimation(false);
    }, 300);
  }, []);

  const handleNavigate = async () => {
    let role = sessionStorage.getItem("role");
    if (role === "customer") {
      const response1 = await getLoginUserDetails(
        sessionStorage.getItem("token")
      );
      if (response1.success) {
        sessionStorage.setItem("userEmail", response1.data.data.email);
        sessionStorage.setItem("userName", response1.data.data.name);
        sessionStorage.setItem("userId", response1.data.data.user_id);
      }
      navigate("/user");
    }

    if (role === "superAdmin" || role === "admin") {
      const response1 = await getLoginUserDetails(
        sessionStorage.getItem("token")
      );
      if (response1.success) {
        sessionStorage.setItem("userEmail", response1.data.data.email);
        sessionStorage.setItem("userName", response1.data.data.name);
        sessionStorage.setItem("userId", response1.data.data.user_id);
      }
      navigate("/admin");
    }
  };

  useEffect(() => {
    const loadIntercom = () => {
      const userPresentOnSession = sessionStorage.getItem("userId");
      if (userPresentOnSession === null) {
        sessionStorage.setItem(
          "userId",
          Math.floor(100000 + Math.random() * 900000)
        );
      }
      if (
        location.pathname !== "/admin" &&
        location.pathname !== "/admin/settings" &&
        location.pathname !== "/admin/settings" &&
        location.pathname !== "/admin/board" &&
        location.pathname !== "/admin/createAdmin"
      ) {
        // Set up intercomSettings
        window.intercomSettings = {
          api_base: "https://api-iam.intercom.io",
          app_id: "wk35gw8g",
          name: sessionStorage.getItem("userName")
            ? sessionStorage.getItem("userName")
            : "", // Full name
          user_id: sessionStorage.getItem("userId"),

          email: sessionStorage.getItem("userEmail")
            ? sessionStorage.getItem("userEmail")
            : "",
          created_at: sessionStorage.getItem("createdAt")
            ? sessionStorage.getItem("createdAt")
            : "",
        };

        // Check if Intercom is already defined
        if (typeof window.Intercom === "function") {
          window.Intercom("reattach_activator");
          window.Intercom("update", window.intercomSettings);
        } else {
          // Create the Intercom function if not already defined
          const intercom = function () {
            intercom.c(arguments);
          };
          intercom.q = [];
          intercom.c = function (args) {
            intercom.q.push(args);
          };
          window.Intercom = intercom;

          // Function to create and insert the script tag
          const loadScript = () => {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.async = true;
            script.src = "https://widget.intercom.io/widget/wk35gw8g";
            script.id = "intercom-script";
            const firstScript = document.getElementsByTagName("script")[0];
            firstScript.parentNode.insertBefore(script, firstScript);
          };

          // Load the script either on load or immediately if the document is already ready
          if (document.readyState === "complete") {
            loadScript();
          } else if (window.attachEvent) {
            window.attachEvent("onload", loadScript);
          } else {
            window.addEventListener("load", loadScript, false);
          }
        }
      }
    };

    setTimeout(() => {
      loadIntercom();
    }, 2000);

    // Cleanup function to remove Intercom script
    return () => {
      const intercomScript = document.getElementById("intercom-script");
      if (intercomScript && location.pathname === "/admin") {
        intercomScript.remove();
      }
      if (typeof window.Intercom === "function") {
        window.Intercom("shutdown");
      }
    };
  }, [token, role, location]);

  const adminLogin = async () => {
    let status = isTokenValid(adminToken);
    if (status.valid) {
      sessionStorage.setItem("token", adminToken);
      sessionStorage.setItem("role", tascRole);
      await getLoginUserDetails(adminToken);
      await getGeneralSettingsData();
      if (id && tascRole === "customer") {
        sessionStorage.setItem("itemId", id);
        // sessionStorage.setItem('count', count);
        navigate(`/${path}`);
      } else if (tascRole === "customer") {
        navigate("/");
      } else {
        navigate("/admin");
      }
    } else {
      navigate("/signin");
    }
  };

  useEffect(() => {
    if (adminToken) {
      adminLogin();
    }
  }, [adminToken]);

  useEffect(() => {
    setTimeout(() => {
      setAnimation(false);
    }, 300);
  }, []);

  useEffect(() => {
    if (adminToken === null || adminToken === undefined) {
      handleNavigate();
    }
  }, []);
  if (adminToken) {
    return <Loader />;
  }
  return (
    <div className="inc-auth-container">
      <div className="container auth-container text-center">
        {loading && <Loader />}
        <div className="cover-container w-100 h-100 pb-2 ">
          <div className="">
            <div className="animation-container" style={{ minHeight: "90px" }}>
              <div
                className={`header-heading1 ${
                  animation ? "animation-content" : ""
                } ff-ws `}
                style={{
                  transition: "transform 1s ease, opacity 2s ease",
                  fontSize: "50px",
                  fontWeight: "500",
                }}
              >
                Onboardify
              </div>
            </div>

            <div
              className="form-container mx-auto"
              style={{ maxWidth: "440px" }}
            >
              <div>
                <div>
                  <img
                    src="/1.png"
                    alt="TASC logo"
                    style={{ maxWidth: "220px" }}
                  />
                </div>
                <div
                  className="fs-24 ff-ws mb-2 text-inc-tundora fw-600"
                  style={{ color: "#434343" }}
                >
                  Sign In
                </div>
              </div>
              <div className="form-auth">
                <input
                  placeholder="Email"
                  type="email"
                  value={userDetails.email}
                  onChange={(e) => handleChangeUserDetails(e, "email")}
                  style={{ background: "#e8f0fe" }}
                  className="input-customer-focus form-control"
                />
                <div className="input-group flex-nowrap" id="password-filled">
                  <input
                    className="form-control input-customer-focus"
                    id="input-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    value={userDetails.password}
                    onChange={(e) => handleChangeUserDetails(e, "password")}
                    style={{ background: "#e8f0fe" }}
                  />
                  <span
                    className="input-group-text fs-5 encrypted eye-icon-container"
                    style={{
                      cursor: "pointer",
                      borderRadius: "0 50px 50px 0px",
                    }}
                  >
                    {showPassword ? (
                      <i
                        className="bi bi-eye-fill"
                        onClick={() => setShowPassword(false)}
                      ></i>
                    ) : (
                      <i
                        className="bi bi-eye-slash-fill"
                        onClick={() => setShowPassword(true)}
                      ></i>
                    )}
                  </span>
                </div>
                <button
                  id="login-button"
                  className="btn btn-newgradiant btn-to-link btn-secondary mt-4 d-flex align-items-center"
                  type="button"
                  style={{
                    border: "0",
                    borderRadius: "50px",
                    gap: "10px",
                    padding: "15px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    transition: "0.5s",
                    height: "46px",
                    opacity:
                      checkEmailIsFilledAndValid() ||
                      checkPasswordIsFilledValid()
                        ? "0.65"
                        : "",
                  }}
                  onClick={handleSubmit}
                  disabled={
                    checkEmailIsFilledAndValid() || checkPasswordIsFilledValid()
                  }
                >
                  <span
                    style={{
                      fontFamily: "Montserrat!important",
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  >
                    Sign In
                  </span>
                  <span
                    className="icon-btn_track"
                    style={{ marginLeft: "10px" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-right-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                    </svg>
                  </span>
                </button>

                <div className="d-flex justify-content-between align-items-start w-100 mt-2">
                  <a
                    href="/forgot"
                    className="fs-13"
                    style={{ color: "#434343" }}
                  >
                    Forgot Password?
                  </a>
                  <a
                    href="/register"
                    className="fs-13"
                    style={{ color: "#434343" }}
                  >
                    Create New Account?
                  </a>
                </div>
                <div
                  className="mt-3 fs-13 ff-ws text-inc-tundora"
                  style={{ color: "grey" }}
                >
                  <span
                    className="mt-3 fs-13 ff-ws text-inc-tundora"
                    style={{ margin: "3px 0px" }}
                  >
                    {" "}
                    Powered by TASC Outsourcing®
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer position="bottom-right" />
      </div>
    </div>
  );
};
