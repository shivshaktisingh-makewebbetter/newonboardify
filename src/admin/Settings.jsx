import { useEffect, useState } from "react";
import { Button, Select } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { Loader } from "../common/Loader";
import { Collapse } from "antd";
import { fetcher } from "../utils/helper";
import {
  getGeneralSettingsData,
  setGeneralSettings,
} from "../apiservice/ApiService";

export const Settings = () => {
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

  const [uiData, setUiData] = useState({
    site_bg: "",
    button_bg: "",
    banner_bg: "",
    banner_content: "",
    header_bg: "",
    head_title_color: "",
  });
  const [logoData, setLogoData] = useState({ logo_name: "", logo_image: "" });
  const [loading, setLoading] = useState(false);
  const [buttonData, setButtonData] = useState([
    {
      type: "In Progress",
      bg: "#fdecb9",
      buttonBg: "#f4992d",
      value: 0,
    },
    {
      type: "Completed",
      bg: "#d5f9e2",
      buttonBg: "#55b44e",
      value: 1,
    },
    {
      type: "Pending",
      bg: "#f4bab6",
      buttonBg: "#e14120",
      value: 2,
    },
    {
      type: "Canceled",
      bg: "#b6b6ba",
      buttonBg: "#757575",
      value: 3,
    },
    {
      type: "Awaiting Action",
      bg: "#e7e7e8",
      buttonBg: "#939498",
      value: 5,
    },
  ]);

  const navigate = useNavigate();

  const handleChangeBg = (e) => {
    setUiData({ ...uiData, site_bg: e.target.value });
  };

  const handleChangeBgBtn = (e) => {
    setUiData({ ...uiData, button_bg: e.target.value });
  };

  const handleChangeLogo = async (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    if (file) {
      reader.onload = (function (theFile) {
        return function (e) {
          setLogoData({ logo_image: e.target.result, logo_name: file.name });
        };
      })(file);
      reader.readAsDataURL(file);
    }
  };

  const handleChangeBgBanner = (e) => {
    setUiData({ ...uiData, banner_bg: e.target.value });
  };

  const handleChangeHeaderBg = (e) => {
    setUiData({ ...uiData, header_bg: e.target.value });
  };

  const handleChangeHeadTitleColor = (e) => {
    setUiData({ ...uiData, head_title_color: e.target.value });
  };

  function startsWithHttp(url) {
    return (
      url.toLowerCase().startsWith("http://") ||
      url.toLowerCase().startsWith("https://")
    );
  }

  const handleChangeBannerText = (e) => {
    setUiData({ ...uiData, banner_content: e.target.value });
  };

  const handleSubmit = async () => {
    let payload = JSON.stringify({
      ui_settings: uiData,
      logo_name: startsWithHttp(logoData.logo_name) ? "" : logoData.logo_name,
      logo_image: startsWithHttp(logoData.logo_image)
        ? ""
        : logoData.logo_image,
    });

    setLoading(true);
    try {
      let response = await setGeneralSettings(payload);
      // console.log(response, "sdfsdfsd");
      if (response.success) {
        toast.success("Settings Updated.");
      } else {
        toast.error("Settings Not Updated.");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
        window.location.reload();
      }, 1000);
    }
  };

  const handleBackNavigation = () => {
    navigate(-1);
  };

  const fetchGeneralSettings = async () => {
    const response = await getGeneralSettingsData();
    if (response.success) {
      const tempData = JSON.parse(response.data.response.ui_settings);
      tempData.banner_content =
        "Hire an attitude, not just experience and qualification. Greg Savage.";
      setUiData(tempData);
      setLogoData({
        logo_name: response.data.response.logo,
        logo_image: response.data.response.logo_location,
      });
    }
  };

  useEffect(() => {
    fetchGeneralSettings();
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div className="w-100 d-flex flex-column align-items-center p-3">
        <div className="col-md-7 col-lg-8 text-start" style={{paddingTop:"10px"}}>
          <h4 className="mb-3">
            <Button
              icon={
                <LeftOutlined
                  style={{
                    color: uiData.button_bg,
                    borderColor: uiData.button_bg,
                  }}
                />
              }
              onClick={handleBackNavigation}
            ></Button>
            <span className="mt-1 ms-2">General Settings</span>
          </h4>
          <hr />

          <div className="row g-3">
            <div className="col-sm-6">
             
              <div className="col-sm-12">
                <label className="form-label">
                  Button background-color&nbsp;<i className="bi bi-pen"></i>
                </label>
                <br />
                <input
                  type="color"
                  className="w-100"
                  id="button_bg"
                  name="button_bg"
                  value={uiData.button_bg}
                  required
                  onChange={handleChangeBgBtn}
                />

                <small className="text-danger text-start ms-2"></small>
              </div>
            </div>

            <div className="col-sm-6 ">
              <div className="">
                <label className="form-label">
                  Choose Logo Image&nbsp;<i className="bi bi-pen"></i>
                </label>
                <input
                  className="form-control"
                  name="logo_image"
                  type="file"
                  id="logo_image"
                  onChange={handleChangeLogo}
                />

                <small className="text-danger text-start ms-2"></small>

                <div
                  id="imageContainer"
                  className="card  mt-2"
                  style={{
                    maxWidth: "200px",
                    maxHeight: "200px",
                    width: "150px",
                    minHeight: "90px",
                  }}
                >
                  {logoData.logo_image === "" ? (
                    <></>
                  ) : (
                    <img src={logoData.logo_image} alt="No preview" />
                  )}
                </div>
              </div>
            </div>

            <div className="col-12 row mt-3">
              <div className="col-sm-6">
                <label className="form-label">
                  Banner background color&nbsp;<i className="bi bi-pen"></i>
                </label>
                <br />
                <input
                  type="color"
                  className="w-100"
                  id="banner_bg"
                  name="banner_bg"
                  value={uiData.banner_bg}
                  required
                  onChange={handleChangeBgBanner}
                />

                <small className="text-danger text-start ms-2"></small>
              </div>
              <div className="col-sm-6">
                <label className="form-label">
                  Header Background Color&nbsp;<i className="bi bi-pen"></i>
                </label>
                <br />
                <input
                  type="color"
                  className="w-100"
                  id="header_bg"
                  name="header_bg"
                  value={uiData.header_bg}
                  required
                  onChange={handleChangeHeaderBg}
                />

                <small className="text-danger text-start ms-2"></small>
              </div>
            </div>
            <div className="col-12">
              <div className="col-sm-12">
                <label className="form-label">
                  Heading Title Color&nbsp;<i className="bi bi-pen"></i>
                </label>
                <br />
                <input
                  type="color"
                  className="w-100"
                  id="head_title_color"
                  name="head_title_color"
                  value={uiData.head_title_color}
                  required
                  onChange={handleChangeHeadTitleColor}
                />

                <small className="text-danger text-start ms-2"></small>
              </div>
            </div>
            <div className="col-12">
              <label className="form-label">
                Banner <span className="text-muted"></span>
              </label>
              <textarea
                type="text"
                className="form-control"
                name="banner_content"
                id="banner_content"
                placeholder="Enter the banner text content ."
                onChange={handleChangeBannerText}
                value={uiData.banner_content}
              ></textarea>

              <small className="text-danger text-start ms-2"></small>
            </div>

            <Button
              style={{
                background: data.button_bg,
                color: "white",
                border: "none",
              }}
              onClick={handleSubmit}
            >
              SAVE SETTINGS
            </Button>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
};
