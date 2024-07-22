import { useEffect, useState } from "react";
import { Hero } from "../components/Hero";
import { getUserFormAndChart } from "../apiservice/ApiService";

export const Check = () => {
  const [chartCode, setChartCode] = useState("");
  const fetchChart = async () => {
    const response = await getUserFormAndChart();

    if (response.success) {
      const columns = JSON.parse(response.data.response?.columns);
      if (
        columns.hasOwnProperty("extra_details") &&
        columns.extra_details.hasOwnProperty("chart_embed_code") &&
        columns.extra_details.chart_embed_code
      ) {
        setChartCode(columns.extra_details.chart_embed_code);
        let element = document.getElementById("iframe-chart");
        element.innerHTML =
          columns.extra_details.chart_embed_code +
          `<div class="w-100 bottom-blur" style="height:50px;"></div>`;
      } else {
        setChartCode("");
      }
    }
  };

  useEffect(() => {
    fetchChart();
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

      <div className="w-100 mt-5" style={{ position: "relative" }}>
        <div
          id="loader"
          className="blurry w-100"
          style={{ height: "100vh", display: "none" }}
        ></div>
        <div
          style={{ margin: "0px", height: "130vh", position: "relative" }}
          className="w-100"
          id="iframe-chart"
        ></div>
      </div>
    </div>
  );
};
