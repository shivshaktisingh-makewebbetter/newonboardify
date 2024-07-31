import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Collapse, Input } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { Loader } from "../common/Loader";
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
  const [statusFields, setStatusFields] = useState([]);
  const [homeSettingData, setHomeSettingData] = useState([
    {
      key: "Request",
      icon: "",
      title: "",
      description: "",
      label: "Request Setting",
    },
    {
      key: "Track",
      icon: "",
      title: "",
      description: "",
      label: "Track Setting",
    },
    {
      key: "Status",
      icon: "",
      title: "",
      description: "",
      label: "Overall Status Setting",
    },
  ]);

  const addField = () => {
    let fields = statusFields;
    fields.push({ status: "", color: "", bgcolor: "" });
    setStatusFields([...fields]);
  };

  const removeField = (key) => {
    let fields = statusFields;
    fields.splice(key, 1);
    setStatusFields([...fields]);
  };

  const changeStatus = useCallback(
    (key, value) => {
      setStatusFields(
        statusFields.map((field, index) =>
          index === key ? { ...field, status: value } : field
        )
      );
    },
    [statusFields]
  );

  const changeColor = useCallback(
    (key, value) => {
      setStatusFields(
        statusFields.map((field, index) =>
          index === key ? { ...field, color: value } : field
        )
      );
    },
    [statusFields]
  );

  const changeBackgroundColorStatus = useCallback(
    (key, value) => {
      setStatusFields(
        statusFields.map((field, index) =>
          index === key ? { ...field, bgcolor: value } : field
        )
      );
    },
    [statusFields]
  );

  const navigate = useNavigate();

  // const handleChangeBg = (e) => {
  //   setUiData({ ...uiData, site_bg: e.target.value });
  // };

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
    let tempUiData = { ...uiData };
    tempUiData.homePageSetting = homeSettingData;
    tempUiData.statusColorSetting = statusFields;
    let payload = JSON.stringify({
      ui_settings: tempUiData,
      logo_name: startsWithHttp(logoData.logo_name) ? "" : logoData.logo_name,
      logo_image: startsWithHttp(logoData.logo_image)
        ? ""
        : logoData.logo_image,
    });

    setLoading(true);
    try {
      let response = await setGeneralSettings(payload);
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
      tempData.banner_content = tempData.banner_content;
      setUiData(tempData);
      setHomeSettingData(tempData.homePageSetting);
      setStatusFields(tempData.statusColorSetting);
      setLogoData({
        logo_name: response.data.response.logo,
        logo_image: response.data.response.logo_location,
      });
    }
  };

  const handleIconChangeSetting = (e, key) => {
    const tempArr = [...homeSettingData];
    tempArr.forEach((item) => {
      if (item.key === key) {
        item.icon = e.target.value;
      }
    });
    setHomeSettingData(tempArr);
  };

  const handleTitleChangeSetting = (e, key) => {
    const tempArr = [...homeSettingData];
    tempArr.forEach((item) => {
      if (item.key === key) {
        item.title = e.target.value;
      }
    });
    setHomeSettingData(tempArr);
  };

  const handleDescriptionChangeSetting = (e, key) => {
    const tempArr = [...homeSettingData];
    tempArr.forEach((item) => {
      if (item.key === key) {
        item.description = e.target.value;
      }
    });
    setHomeSettingData(tempArr);
  };

  useEffect(() => {
    fetchGeneralSettings();
  }, []);



  const items = useMemo(() => {
    return homeSettingData.map((item) => ({
      key: item.key,
      label: item.label,
      children: (
        <div key={item.key}>
          <Input
            placeholder="Add Icon Class"
            onChange={(e) => handleIconChangeSetting(e, item.key)}
            addonBefore="Icon"
            style={{ borderRadius: "10px" }}
            value={item.icon}
          />
          <Input
            placeholder="Add Title"
            className="mt-30"
            onChange={(e) => handleTitleChangeSetting(e, item.key)}
            addonBefore="Title"
            style={{ borderRadius: "10px" }}
            value={item.title}
          />
          <Input
            placeholder="Add Description"
            className="mt-30"
            onChange={(e) => handleDescriptionChangeSetting(e, item.key)}
            addonBefore="Description"
            style={{ borderRadius: "10px" }}
            value={item.description}
          />
        </div>
      ),
    }));
  }, [homeSettingData]);

  return (
    <>
      {loading && <Loader />}
      <div className="w-100 d-flex flex-column align-items-center p-3">
        <div
          className="col-md-7 col-lg-8 text-start"
          style={{ paddingTop: "10px" }}
        >
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

            <h5
              style={{
                color: "#343a40",
                margin: 0,
                padding: "0.75rem 1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #dee2e6",
                backgroundColor: "#e9ecef",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
              }}
            >
              <span style={{ fontWeight: 600, fontSize: "18px" }}>
                Home Page Setting
              </span>
            </h5>

            <Collapse
              size="large"
              items={items}
              style={{ marginTop: "0px", marginBottom: "10px" }}
            />
            <h5
              style={{
                color: "#343a40",
                margin: 0,
                padding: "0.75rem 1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #dee2e6",
                backgroundColor: "#e9ecef",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
              }}
            >
              <span style={{ fontWeight: 600, fontSize: "18px" }}>
                Status Color Settings:
              </span>
              <Button
                type="text"
                onClick={() => addField()}
                style={{ color: "#007bff", fontWeight: 600 }}
              >
                + Add Field
              </Button>
            </h5>

            <div
              style={{
                width: "100%",
                border: statusFields.length > 0 ? "1px solid #dee2e6" : "",
                borderRadius: "8px",

                backgroundColor: "#f8f9fa",
                marginBottom: "10px",
              }}
            >
              <div style={{ padding: statusFields.length > 0 ? "1rem" : "" }}>
                {statusFields.map((item, i) => (
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "flex-end",
                      marginBottom: "1rem",
                      flexWrap: "wrap",
                    }}
                    key={i}
                  >
                    <div style={{ flex: 1, minWidth: "200px" }}>
                      <label
                        style={{
                          display: "block",
                          fontWeight: 600,
                          fontSize: "14px",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Status
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Label"
                        style={{
                          width: "100%",
                          padding: "0.5rem",
                          border: "1px solid #ced4da",
                          borderRadius: "4px",
                        }}
                        value={item.status}
                        onChange={(e) => changeStatus(i, e.target.value)}
                      />
                    </div>
                    <div style={{ flex: 1, minWidth: "200px" }}>
                      <label
                        style={{
                          display: "block",
                          fontWeight: 600,
                          fontSize: "14px",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Color
                      </label>
                      <input
                        type="color"
                        value={item.color}
                        style={{
                          width: "100%",
                          padding: "0.5rem",
                          border: "none",
                          height: "38px",
                        }}
                        onChange={(e) => changeColor(i, e.target.value)}
                      />
                    </div>
                    <div style={{ flex: 1, minWidth: "200px" }}>
                      <label
                        style={{
                          display: "block",
                          fontWeight: 600,
                          fontSize: "14px",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Background
                      </label>
                      <input
                        type="color"
                        value={item.bgcolor}
                        style={{
                          width: "100%",
                          padding: "0.5rem",
                          border: "none",
                          height: "38px",
                        }}
                        onChange={(e) =>
                          changeBackgroundColorStatus(i, e.target.value)
                        }
                      />
                    </div>
                    <Button
                      type="text"
                      onClick={() => removeField(i)}
                      style={{
                        color: "#dc3545",
                        fontWeight: 600,
                        cursor: "pointer",
                        padding: "0.5rem 1rem",
                        backgroundColor: "transparent",
                        border: "none",
                        marginLeft: "auto",
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
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
