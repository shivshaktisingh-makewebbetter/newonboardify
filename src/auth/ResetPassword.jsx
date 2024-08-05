import React, { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader } from "../common/Loader";
import { updateNewPassword } from "../apiservice/ApiService";

const ResetPassword = () => {
  const location = useLocation();
  const queryParameters = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [animation, setAnimation] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [userDetails, setUserDetails] = useState({
    password: "",
    newPassword: "",
  });

  const buttonDisable = () => {
    if (userDetails.password.length < 6) {
      return true;
    } else if (userDetails.newPassword < 6) {
      return true;
    } else if (userDetails.newPassword !== userDetails.password) {
      return true;
    }
    return false;
  };

  const handleSubmit = async () => {
    let payload = JSON.stringify({
      password: userDetails.password,
      conf_password: userDetails.newPassword,
      token: queryParameters.get("token"),
    });
    try {
      setLoading(true);
      const response = await updateNewPassword(payload);
      if (response.success) {
        toast.success(
          "Password changed Successfully, Redirecting to the login Page."
        );
        setTimeout(() => {
          navigate("/");
        }, 2000);
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

  useEffect(() => {
    setTimeout(() => {
      setAnimation(false);
    }, 300);
  }, []);
  return (
    <div className="inc-auth-container">
      <div className="container auth-container text-center">
        {loading && <Loader />}
        <div className="cover-container w-100 h-100 pb-2 ">
          <div>
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
            <div className="form-container mx-auto">
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
                  Enter New Password
                </div>
              </div>
              <div className="form-auth">
                <div className="input-group flex-nowrap" id="password-filled">
                  <input
                    className="form-control"
                    id="input-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    style={{ background: "#e8f0fe" }}
                    value={userDetails.password}
                    onChange={(e) => handleChangeUserDetails(e, "password")}
                  />
                  <span
                    className="input-group-text fs-5 encrypted"
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
                <div className="input-group flex-nowrap" id="password-filled">
                  <input
                    className="form-control"
                    id="input-password"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="confirm password"
                    name="password"
                    value={userDetails.newPassword}
                    style={{ background: "#e8f0fe" }}
                    onChange={(e) => handleChangeUserDetails(e, "newPassword")}
                  />
                  <span
                    className="input-group-text fs-5 encrypted"
                    style={{
                      cursor: "pointer",
                      borderRadius: "0 50px 50px 0px",
                    }}
                  >
                    {showNewPassword ? (
                      <i
                        className="bi bi-eye-fill"
                        onClick={() => setShowNewPassword(false)}
                      ></i>
                    ) : (
                      <i
                        className="bi bi-eye-slash-fill"
                        onClick={() => setShowNewPassword(true)}
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
                  }}
                  disabled={buttonDisable()}
                  onClick={handleSubmit}
                >
                  <span className="fw-bold">Change password</span>
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
                <div className="d-flex justify-content-center w-100 mt-2">
                  <a href="/signin" className="text-inc-tundora fs-13">
                    Back to login?
                  </a>
                </div>
                <div
                  className="mt-3 fs-13 ff-ws text-inc-tundora"
                  style={{ color: "grey" }}
                >
                  Powered by TASC Outsourcing®
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

export default ResetPassword;
