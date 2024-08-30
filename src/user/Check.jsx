import { useEffect, useState } from "react";
import { Hero } from "../components/Hero";
import {
  getAllProfileDataByUser,
  lastSelectedChart,
  updateLastSelectedChart,
} from "../apiservice/ApiService";
import { Select } from "antd";

export const Check = () => {
  const [options, setOptions] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(undefined);
  const [profileId, setProfileId] = useState("");

  const fetchProfiledata = async () => {
    try {
      const response = await getAllProfileDataByUser();
      const response1 = await lastSelectedChart();

      if (response.success) {
        setProfileId(response.data.response[0].id);

        if (response.data.response.length > 0) {
          let tempArr = [];
          if (
            response.data.response[0].hasOwnProperty("services") &&
            response.data.response[0].services.length > 0
          ) {
            response.data.response[0].services.forEach((item) => {
              tempArr.push({
                label: item.title,
                value: item.id,
                chart: item.service_chart_link,
              });
            });
          }

          if (response1.success) {
            let flag = true;
            tempArr.forEach((item) => {
              if (item.value == response1.data.response[0].service_id) {
                flag = false;
                setSelectedRequest(item.value);
              }
            });

            if (flag) {
              setSelectedRequest(tempArr[0].value);
            }
          } else {
            setSelectedRequest(tempArr[0].value);
          }
          setOptions(tempArr);
          let element = document.getElementById("iframe-chart");
          element.innerHTML =
            tempArr[0].chart +
            `<div class="w-100 bottom-blur" style="height:50px;"></div>`;
        }
      }
    } catch (err) {
    } finally {
    }
  };

  const handleChangeRequest = async (item) => {
    await updateLastSelectedChart({ profile_id: profileId, service_id: item });
    setIsBlurry(true);
    const tempOptions = [...options];
    tempOptions.forEach((subItem) => {
      if (subItem.value === item) {
        setSelectedRequest(subItem.value);
        let element = document.getElementById("iframe-chart");
        element.innerHTML =
          subItem.chart +
          `<div class="w-100 bottom-blur" style="height:50px;"></div>`;
      }
    });
    setTimeout(() => {
      setIsBlurry(false);
    }, 5000);
  };
  const [isBlurry, setIsBlurry] = useState(true);
  const [mobileView, setMobileView] = useState(false);

  function checkScreenWidth() {
    if (window.innerWidth < 768) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", checkScreenWidth);
    window.addEventListener("load", checkScreenWidth);
    checkScreenWidth();

    // Cleanup function to remove the listeners on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
      window.removeEventListener("load", checkScreenWidth);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBlurry(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetchProfiledata();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ marginTop: "3rem", marginBottom: "1rem" }}>
        <Hero
          heading={"Overall Status"}
          subheading="Stay informed and in control of the overall status of your onboarding requests"
          forHome={true}
        />
      </div>
      {!mobileView && (
        <div style={{ maxWidth: "200px" }}>
          <Select
            style={{
              width: "100%",
            }}
            placeholder="Please select Request"
            onChange={handleChangeRequest}
            options={options}
            value={selectedRequest || undefined}
            disabled={mobileView}
          />
        </div>
      )}

      {mobileView ? (
        <div
          style={{
            minHeight: "40vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div class="responsive-image-container">
            <img src="/img.png" alt="Chart Not Available" />
          </div>

          <div>
            This feature is currently unavailable on mobile. Please go to
            desktop to use it.
          </div>
        </div>
      ) : (
        <div className="w-100 mt-5" style={{ position: "relative" }}>
          <div
            id="loader"
            className="blurry w-100"
            style={{ height: "100vh", display: "none" }}
          ></div>

          <div
            style={{
              margin: "0px",
              height: "130vh",
              position: "relative",
              transition: "filter 0.5s", // Smooth transition for filter change
              filter: isBlurry ? "blur(5px)" : "none",
            }}
            className="w-100"
            id="iframe-chart"
          ></div>
        </div>
      )}
    </div>
  );
};
