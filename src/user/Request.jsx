import React, { useEffect, useState } from "react";
import { Hero } from "../components/Hero";
import { getAllProfileDataByUser } from "../apiservice/ApiService";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { LeftOutlined, PlusOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { Loader } from "../common/Loader";
import { toast, ToastContainer } from "react-toastify";

export const Request = () => {
  const [formCode, setFormCode] = useState("");
  const [profileData, setProfileData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  const settingsData = JSON.parse(sessionStorage.getItem("settings")) || {
    image: "https://onboardify.tasc360.com/uploads/y22.png",
    site_bg: "#ffffff",
    button_bg: "#497ed8",
    banner_bg: "#497ed8",
    banner_content:
      "Hire an attitude, not just experience and qualification. Greg Savage.",
    header_bg: "#f7f7f7",
    head_title_color: "#497ed8",
  };

  const settings = {
    infinite: true,
    speed: 500,
    adaptiveHeight: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <CustomArrow arrowType="next" />,
    prevArrow: <CustomArrow arrowType="prev" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const fetchProfileData = async () => {
    setLoading(true);
    try {
      const response = await getAllProfileDataByUser();
      if (response.success) {
        if (response.data.response.length > 0) {
          setProfileData(response.data.response);
          setTimeout(setSlickTrackHeight, 2000);
        }
        if (response.data.response.length === 0) {
          setProfileData([]);
          toast.error(response.message);
          setLoading(false);
        }
      } else {
        if (response.data.response.length === 0) {
          toast.error(response.message);
          setProfileData([]);
          setLoading(false);
        }
      }
    } catch (err) {
    } finally {
      setLoading(false);
      // Ensure the DOM is fully rendered before setting the height
    }
  };

  const handleOpenModal = (item) => {
    setOpen(true);
    setFormCode(item.service_form_link);
  };

  const setSlickTrackHeight = () => {
    const slickTracks = document.querySelectorAll(".slick-track");
    slickTracks.forEach((slickTrack) => {
      slickTrack.style.height = "100%";
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const buttonStyle = {
    border: `1px solid ${settingsData.button_bg}`,
    color: settingsData.button_bg,
    transition: "all 0.3s ease",
    height: "41px",
    borderRadius: "10px",
    fontSize: "12px",
    fontWeight: "600",
  };

  const buttonHoverStyle = {
    backgroundColor: settingsData.button_bg,
    color: "#ffffff",
  };

  const updateItemsPerView = () => {
    const width = window.innerWidth;
    if (width <= 772) setItemsPerView(1);
    else if (width <= 972) setItemsPerView(2);
    else if (width <= 1094) setItemsPerView(3);
    else setItemsPerView(4);
  };

  useEffect(() => {
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => {
      window.removeEventListener("resize", updateItemsPerView);
    };
  }, []);

  const prev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const next = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, profileData[0].services.length - itemsPerView)
    );
  };

  return (
    <div style={{ padding: "1rem", display: "flex", justifyContent: "center" }}>
      {loading && <Loader />}
      <div style={{ marginTop: "3rem", marginBottom: "1rem" }}>
        <Hero
          heading={"Submit Service Request"}
          subheading="Provide essential details to ensure a smooth and efficient experience, and enable seamless tracking of your requests."
          forHome={true}
        />

        {profileData.length > 0 &&
          profileData[0].hasOwnProperty("services") &&
          profileData[0].services.length > 4 &&
          profileData[0].services.length > itemsPerView && (
            <div className="carousel">
              <Button
                onClick={prev}
                icon={<LeftOutlined />}
                style={{ marginRight: "20px" }}
              ></Button>
              <div className="carousel-wrapper">
                <div
                  className="carousel-content"
                  style={{
                    transform: `translateX(-${
                      currentIndex * (100 / itemsPerView)
                    }%)`,
                  }}
                >
                  {profileData[0].services.map((item, index) => (
                    <div className="carousel-slide-wrapper" key={item.title}>
                      <div className="craousel-slider-wrapper-child">
                        <div className="img-container">
                          <img src={item.file_location} alt="No Preview" />
                        </div>
                        <p
                          style={{
                            textAlign: "left",
                            width: "100%",
                            maxWidth: "263px",
                            color: "#434343",
                            fontSize: "26px",
                            fontWeight: "700",
                            marginTop: "20px",
                            marginBottom: "0px",
                          }}
                        >
                          {item.title}
                        </p>
                        <p
                          style={{
                            textAlign: "left",
                            width: "100%",
                            maxWidth: "263px",
                            color: "#928f8f",
                            fontSize: "17px",
                            fontWeight: "400",
                            marginBottom: "0px",
                          }}
                        >
                          {item.description}
                        </p>
                        <div
                          style={{
                            width: "100%",
                            textAlign: "left",
                            position: "absolute",
                            bottom: "20px",
                          }}
                        >
                          <Button
                            className="ff-mont"
                            icon={
                              <PlusOutlined
                                style={{
                                  color: settingsData.button_bg,
                                  transition: "all 0.3s ease",
                                }}
                              />
                            }
                            iconPosition="start"
                            style={buttonStyle}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor =
                                buttonHoverStyle.backgroundColor;
                              e.currentTarget.style.color =
                                buttonHoverStyle.color;
                              e.currentTarget.querySelector(
                                ".anticon"
                              ).style.color = buttonHoverStyle.color;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor =
                                "transparent";
                              e.currentTarget.style.color =
                                settingsData.button_bg;
                              e.currentTarget.querySelector(
                                ".anticon"
                              ).style.color = settingsData.button_bg;
                            }}
                            onClick={() => handleOpenModal(item)}
                            disabled={!item.service_form_link}
                          >
                            Submit Request
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Button
                onClick={next}
                icon={<RightOutlined />}
                style={{ marginLeft: "20px" }}
              ></Button>
            </div>
          )}

        <div className="new-carousel-container">
          <div className="new-grid">
            {profileData.length > 0 &&
              profileData[0].hasOwnProperty("services") &&
              profileData[0].services.length > 0 &&
              profileData[0].services.length <= 4 &&
              profileData[0].services.map((item) => (
                <div key={item.title} className="new-card">
                  <div className="new-img-container">
                    <img src={item.file_location} alt={item.title} />
                  </div>
                  <div className="new-content">
                    <p className="new-title">{item.title}</p>
                    <p className="new-description">{item.description}</p>

                    <div className="new-button-container">
                      <Button
                        style={buttonStyle}
                        icon={
                          <PlusOutlined
                            style={{
                              color: settingsData.button_bg,
                              transition: "all 0.3s ease",
                            }}
                          />
                        }
                        iconPosition="start"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor =
                            buttonHoverStyle.backgroundColor;
                          e.currentTarget.style.color = buttonHoverStyle.color;
                          e.currentTarget.querySelector(
                            ".anticon"
                          ).style.color = buttonHoverStyle.color;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = settingsData.button_bg;
                          e.currentTarget.querySelector(
                            ".anticon"
                          ).style.color = settingsData.button_bg;
                        }}
                        onClick={() => handleOpenModal(item)}
                        disabled={!item.service_form_link}
                      >
                        Submit Request
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <Modal
        open={open}
        centered
        footer={(_) => <></>}
        onCancel={() => {
          setOpen(false);
        }}
        width={700}
      >
        <div
          style={{ margin: "0px", height: "75vh", marginTop: "30px" }}
          id="iframe-signup"
          dangerouslySetInnerHTML={{ __html: formCode }}
        ></div>
      </Modal>

      <ToastContainer position="bottom-right" />
    </div>
  );
};

const CustomArrow = (props) => {
  const { className, onClick, arrowType } = props;

  // Common styles for the arrow container
  const commonStyle = {
    paddingRight: arrowType === "next" ? "0px" : "200px",
    paddingLeft: arrowType === "prev" ? "0px" : "0px",
    borderRadius: "50%", // Makes the container circular
    cursor: "pointer",
    zIndex: 2,
  };

  return (
    <div className={className} style={commonStyle} onClick={onClick}>
      {arrowType === "prev" ? (
        <LeftOutlined style={{ color: "grey", fontSize: "20px" }} /> // Icon color and size
      ) : (
        <RightOutlined style={{ color: "grey", fontSize: "20px" }} /> // Icon color and size
      )}
    </div>
  );
};

export default CustomArrow;
