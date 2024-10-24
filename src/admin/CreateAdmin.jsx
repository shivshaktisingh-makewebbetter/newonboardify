import { LeftOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../utils/authUtils";
import { setUserOrAdmin } from "../apiservice/ApiService";
import { toast, ToastContainer } from "react-toastify";
import { Loader } from "../common/Loader";

export const CreateAdmin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: 0,
    name: "",
    email: "",
    password: "",
    company_name: "",
    phone: "",
  });

  const options = [
    { label: "User", value: 0 },
    { label: "Admin", value: 2 },
    { label: "Super Admin", value: 1 },
  ];

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

  const handleRole = (e) => {
    if (e === 0) {
      setFormData({ ...formData, role: e });
    } else {
      setFormData({ ...formData, phone: "", company_name: "", role: e });
    }
  };

  const handleBackNavigation = () => {
    navigate(-1);
  };

  const handleInputChange = (e, filter) => {
    const tempFormData = { ...formData };
    tempFormData[filter] = e.target.value;
    setFormData(tempFormData);
  };

  const handleSubmit = async () => {
    setBtnLoading(true);
    try {
      const response = await setUserOrAdmin(JSON.stringify(formData));
      if (response.success) {
        toast.success("Created Succesfully");
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error("Not Created.");
    } finally {
      setBtnLoading(false);
    }
  };

  const isFormValid = () => {
    let flag = false;
    if (formData.role === 0) {
      flag =
        formData.name.length > 0 &&
        formData.company_name.length > 0 &&
        formData.email.length > 0 &&
        formData.password.length > 0 &&
        formData.phone.length > 0;
    } else {
      flag =
        formData.name.length > 0 &&
        formData.email.length > 0 &&
        formData.password.length > 0;
    }
    return flag;
  };

  return (
    <div className="pt-84">
      {btnLoading && <Loader />}
      <div
        className="border-bottom"
        style={{
          display: "flex",
          alignItems: "center",
          paddingBottom: "10px",
        }}
      >
        <Button
          icon={
            <LeftOutlined
              style={{
                color: settingData.button_bg,
                borderColor: settingData.button_bg,
              }}
            />
          }
          onClick={handleBackNavigation}
        ></Button>
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <UserAddOutlined style={{ fontSize: "40px" }} />{" "}
          <span style={{ fontSize: "30px" }}>Add Admin/User</span>
        </div>
      </div>
      <div
        className="form-container mx-auto"
        style={{ maxWidth: "440px", marginTop: "20px" }}
      >
        <div className="form-auth" id="registration-custom-form">
          <Select
            placeholder={"Select Role"}
            style={{ width: "100%", borderRadius: "10px" }}
            popupMatchSelectWidth={false}
            placement="bottomLeft"
            onChange={handleRole}
            options={options}
            value={formData.role}
          />
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => handleInputChange(e, "name")}
            style={{ background: "#e8f0fe" }}
            className="input-customer-focus form-control"
          />
          <input
            type="text"
            placeholder="Email*"
            name="email"
            value={formData.email}
            onChange={(e) => handleInputChange(e, "email")}
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
              onChange={(e) => handleInputChange(e, "password")}
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
          {formData.role === 0 && (
            <>
              {" "}
              <input
                type="text"
                placeholder="Company Name*"
                value={formData.company_name}
                onChange={(e) => handleInputChange(e, "company_name")}
                style={{ background: "#e8f0fe" }}
                className="input-customer-focus form-control"
              />
              <input
                type="text"
                placeholder="+966 011 XXX XXXX"
                name="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange(e, "phone")}
                style={{ background: "#e8f0fe" }}
                className="input-customer-focus form-control"
              />
            </>
          )}

          <Button
            id="login-button"
            className="btn  btn-to-link btn-secondary mt-4 d-flex align-items-center"
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
              background: settingData.button_bg,
            }}
            disabled={!isFormValid()}
            onClick={handleSubmit}
            loading={btnLoading}
          >
            <span
              style={{
                fontFamily: "Montserrat!important",
                fontSize: "12px",
                fontWeight: 700,
              }}
            >
              Submit
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
          </Button>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};
