import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { Hero } from "../components/Hero";
import {
  getAllProfileDataByUser,
  getUserFormAndChart,
} from "../apiservice/ApiService";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { LeftOutlined, PlusOutlined, RightOutlined } from "@ant-design/icons";

export const Request = () => {
  const [formCode, setFormCode] = useState("");
  const [profileData, setProfileData] = useState([]);

  const CustomLeftArrow = ({ onClick }) => (
    <div className="custom-arrow left" onClick={onClick}>
      <LeftOutlined />
    </div>
  );

  const CustomRightArrow = ({ onClick }) => (
    <div className="custom-arrow right" onClick={onClick}>
      <RightOutlined />
    </div>
  );

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
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
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
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

  useEffect(() => {
    fetchProfiledata();
  }, []);

  console.log(profileData, "prof");

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ marginTop: "3rem", marginBottom: "1rem" }}>
        <Hero
          heading={"Submit Service Request"}
          subheading="Provide essential details to ensure a smooth and efficient experience, and enable seamless tracking of your requests."
          forHome={true}
        />

<div className="carousel-container">
      <Slider {...settings}>
        <div>
          <img src="/1.png" alt="Slide 1" />
        </div>
        <div>
          <img src="/1.png" alt="Slide 2" />
        </div>
        <div>
          <img src="/1.png" alt="Slide 3" />
        </div>
      </Slider>
    </div>
{/* 
        <div className="carousel-container">
          <Carousel
            arrows
            dots={false}
            infinite={true}
            slidesToShow={4}
            prevArrow={<CustomLeftArrow />}
            nextArrow={<CustomRightArrow />}
          >
            {profileData.length > 0 &&
              profileData[0].hasOwnProperty("services") &&
              profileData[0].services.map((item) => {
                return (
                  <div className="carousel-slide-wrapper" key={item.title}>
                    <div
                      className="carousel-slide"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        paddingBottom: "60px",
                        position: "relative",
                      }}
                    >
                      <div style={{ width: "263px", borderRadius: "10px" }}>
                        <img
                          src={item.file_location}
                          alt="No Preview"
                          style={{ width: "100%", borderRadius: "10px" }}
                          height={170}
                        />
                      </div>
                      <p
                        style={{
                          textAlign: "left",
                          width: "100%",
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
                          color: "#928f8f",
                          fontSize: "17px",
                          fontWeight: "400",
                          marginTop: "20px",
                          marginBottom: "0px",
                        }}
                      >
                        {item.description}
                      </p>
                      <div style={{ width: "100%", textAlign: "left" }}>
                        <Button
                          icon={<PlusOutlined />}
                          iconPosition="start"
                          style={{ position: "absolute", bottom: "0px" }}
                        >
                          Submit Request
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </Carousel>
        </div> */}
      </div>
    </div>
  );
};

const CustomArrow = (props) => {
  const { className, style, onClick, arrowType } = props;
  return (
    <div
      className={`${className} ${arrowType}`}
      style={{ ...style, display: 'block', background: '#000', borderRadius: '50%' }}
      onClick={onClick}
    />
  );
};

export default CustomArrow;
