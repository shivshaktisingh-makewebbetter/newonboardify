import React, { useEffect, useState } from "react";
import { Hero } from "../components/Hero";
import { getAllProfileDataByUser } from "../apiservice/ApiService";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { LeftOutlined, PlusOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";

export const Request = () => {
  const [formCode, setFormCode] = useState("");
  const [profileData, setProfileData] = useState([]);
  const [open, setOpen] = useState(false);

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

  const fetchProfiledata = async () => {
    try {
      const response = await getAllProfileDataByUser();
      if (response.success) {
        if (response.data.response.length > 0) {
          setProfileData(response.data.response);
        }
      }
    } catch (err) {
    } finally {
    }
  };

  const handleOpenModal = (item) => {
    setOpen(true);
    fetchForm(item);
  };

  const fetchForm = (item) => {
    let element = document.getElementById("iframe-signup");
    element.innerHTML = item.service_form_link;
  };

  useEffect(() => {
    fetchProfiledata();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ marginTop: "3rem", marginBottom: "1rem" }}>
        <Hero
          heading={"Submit Service Request"}
          subheading="Provide essential details to ensure a smooth and efficient experience, and enable seamless tracking of your requests."
          forHome={true}
        />

        <div className="carousel-container" style={{ maxWidth: "1200px" }}>
          <Slider {...settings}>
            {profileData.length > 0 &&
              profileData[0].hasOwnProperty("services") &&
              profileData[0].services.map((item) => {
                return (
                  <div className="carousel-slide-wrapper" key={item.title}>
                    <div
                      style={{
                        padding: "20px",
                        paddingBottom: "60px",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          maxWidth: "263px",
                          maxHeight: "170px",
                          borderRadius: "10px",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={item.file_location}
                          alt="No Preview"
                          style={{
                            width: "100%",
                            borderRadius: "10px",
                            objectFit: "contain",
                            height: "auto",
                          }}
                        />
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
                          minHeight: "78px",
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
                          marginTop: "20px",
                          marginBottom: "0px",
                          minHeight: "77px",
                        }}
                      >
                        {item.description}
                      </p>
                      <div style={{ width: "100%", textAlign: "left" }}>
                        <Button
                          icon={
                            <PlusOutlined
                              style={{ color: settingsData.button_bg }}
                            />
                          }
                          iconPosition="start"
                          style={{
                            position: "absolute",
                            bottom: "0px",
                            border: `1px solid ${settingsData.button_bg}`,
                            color: settingsData.button_bg,
                          }}
                          onClick={() => handleOpenModal(item)}
                          disabled={
                            item.service_form_link === undefined ||
                            item.service_form_link.length === 0
                          }
                        >
                          Submit Request
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>
      <Modal
        open={open}
        centered
        footer={(_) => <></>}
        onCancel={() => {
          setOpen(false);
        }}
        width={800}
      >
        <div style={{ margin: "0px", height: "75vh" }} id="iframe-signup"></div>
      </Modal>
    </div>
  );
};

const CustomArrow = (props) => {
  const { className, onClick, arrowType } = props;

  // Common styles for the arrow container
  const commonStyle = {
    paddingRight: arrowType === "next" ? "0px" : "200px",
    paddingLeft: arrowType === "prev" ? "0px" : "200px",
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
