import { useEffect, useState } from "react";
import { Hero } from "../components/Hero";
import { getAllProfileDataByUser } from "../apiservice/ApiService";
import { Select } from "antd";

export const Check = () => {
  const [options, setOptions] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(undefined);

  const fetchProfiledata = async () => {
    try {
      const response = await getAllProfileDataByUser();
      if (response.success) {
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
          setOptions(tempArr);
          setSelectedRequest(tempArr[0].value);
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

  const handleChangeRequest = (item) => {
    setIsBlurry(true)
    const tempOptions = [...options];
    tempOptions.forEach((subItem) => {
      if (subItem.value === item) {
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

  useEffect(() => {
    // Remove the blur effect after a few seconds
    
    const timer = setTimeout(() => {
      setIsBlurry(false);
    }, 5000); // 5000 milliseconds = 5 seconds

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
      <div>
        <Select
          style={{
            width: "100%",
          }}
          placeholder="Please select Request"
          onChange={handleChangeRequest}
          options={options}
          value={selectedRequest || undefined}
        />
      </div>

      <div className="w-100 mt-5" style={{ position: "relative" }}>
        <div
          id="loader"
          className="blurry w-100"
          style={{ height: "100vh", display: "none" }}
        ></div>
        {/* <div
          style={{ margin: "0px", height: "130vh", position: "relative" }}
          className="w-100"
          id="iframe-chart"
        ></div> */}
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
        >
          {/* Content inside the div */}
        </div>
      </div>
    </div>
  );
};
