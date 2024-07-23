import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { Loader } from "../common/Loader";
import { fetcher } from "../utils/helper";
import { registerApi } from "../apiservice/ApiService";

export const Register = () => {
  const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/;

  const [showPassword, setShowPassword] = useState(false);
  const [animation, setAnimation] = useState(true);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [recaptchaExpired, setRecaptchaExpired] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    company_name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const onRecaptchaExpired = () => {
    setRecaptchaToken(null);
    setRecaptchaExpired(true);
  };

  const onRecaptchaChange = (token) => {
    setRecaptchaToken(token);
    setRecaptchaExpired(false);
  };

  useEffect(() => {
    const { name, company_name, email, password } = formData;
    setIsFormValid(
      name.trim() !== "" &&
        company_name.trim() !== "" &&
        email.trim() !== "" &&
        emailRegex.test(email) &&
        password.trim() !== "" &&
        recaptchaToken !== "" &&
        !recaptchaExpired
    );
  }, [formData, recaptchaToken, recaptchaExpired]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }
    formData.domain = "onboardify";
    let payload = JSON.stringify(formData);
    try {
      setLoading(true);
      const response = await registerApi(payload);
      console.log(response.success , 'response')
      if (response.success) {
        toast.success('Just verify your email address to confirm that you want to use this email');
      } else {
        toast.error(response.message);
      }
      console.log(response);
    } catch (err) {
      console.log(err, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
        <div className="cover-container w-100 h-100 p-3">
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
          <div className="form-container mx-auto" style={{ maxWidth: "440px" }}>
            <div>
              <img
                src="/tasc.svg"
                alt="TASC logo"
                style={{ maxWidth: "220px" }}
              />
              <div
                className="fs-24 ff-ws mb-3 text-inc-tundora"
                style={{ fontWeight: 600, color: "#434343" }}
              >
                Sign Up
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              className="form-auth"
              id="registration-custom-form"
            >
              <input
                type="text"
                placeholder="Name*"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                style={{ background: "#e8f0fe" }}
                className="input-customer-focus form-control"
              />
              <input
                type="text"
                placeholder="Company name*"
                name="company_name"
                value={formData.company_name}
                onChange={handleInputChange}
                style={{ background: "#e8f0fe" }}
                className="input-customer-focus form-control"
              />
              <input
                type="text"
                placeholder="+966 011 XXX XXXX"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                style={{ background: "#e8f0fe" }}
                className="input-customer-focus form-control"
              />
              <input
                type="text"
                placeholder="Email*"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
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
                  value={formData.password}
                  onChange={handleInputChange}
                  style={{ background: "#e8f0fe" }}
                />
                <span
                  className="input-group-text fs-5 encrypted"
                  style={{ cursor: "pointer", borderRadius: "0 50px 50px 0" }}
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
              <div className="w-100 d-flex justify-content-center">
                <ReCAPTCHA
                  sitekey="6LdmFMQpAAAAAGwLfYZopzckKXOu0obCtpHW0obV"
                  onChange={onRecaptchaChange}
                  onExpired={onRecaptchaExpired}
                />
              </div>
              <button
                id="login-button"
                className="btn btn-gradiant btn-to-link btn-secondary mt-4 d-flex align-items-center"
                type="button"
                style={{
   
                  border: "0",
                  borderRadius: "50px",
                  gap: "10px",
                  padding: "15px",
                  display: "flex",
                  alignItems: "center",
             
                  transition: "0.5s",
                  height: "46px",
                  
                }}
                disabled={!isFormValid}
                onClick={handleSubmit}
              >
                <span
                  style={{
                    fontFamily: "Montserrat!important",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}
                >
                  Sign Up
                </span>
                <span className="icon-btn_track" style={{ marginLeft: "10px" }}>
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
            </form>
            <div className="mt-4">
              <a href="/" className="fs-13" style={{ color: "#434343" }}>
                Already have an Account?
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
        <ToastContainer position="bottom-right" />
      </div>
    </div>
  );
};


