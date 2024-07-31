import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import { Hero } from "../components/Hero";
import {
  getAllProfileDataByUser,
  getUserFormAndChart,
} from "../apiservice/ApiService";

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

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
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

<Carousel
  swipeable={false}
  draggable={false}
  showDots={true}
  responsive={responsive}
  ssr={true} // means to render carousel on server-side.
  infinite={true}
  keyBoardControl={true}
  customTransition="all .5"
  transitionDuration={500}
  containerClass="carousel-container"
  removeArrowOnDeviceType={["tablet", "mobile"]}
  dotListClass="custom-dot-list-style"
  itemClass="carousel-item-padding-40-px"
>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</Carousel>;
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
