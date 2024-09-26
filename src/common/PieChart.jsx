import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { CustomTooltip } from "./CustomToolTip";

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart = ({
  title,
  dataset,
  bgSet,
  pieChartLabel,
  borderColorSetPie,
  description,
}) => {
  const data = {
    labels: pieChartLabel,
    datasets: [
      {
        label: "",
        data: dataset,
        backgroundColor: bgSet,
        borderColor: borderColorSetPie,
        borderWidth: 1,
        hoverBackgroundColor: bgSet,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          boxWidth: 10,
          boxHeight: 10,
        },
      },
      tooltip: {
        xAlign: "center", // Horizontally center the tooltip
        yAlign: "bottom", // Vertically align the tooltip to the top
        displayColors: false,
        backgroundColor: "#ffffff",
        titleFont: {
          size: 12,
          weight: "400",
        },
        titleColor: "#6d7175",
        bodyFont: {
          size: 16,
          weight: "700",
          color: "#202223",
        },
        bodyColor: "#000000",
        padding: {
          top: 10, // Add padding to ensure proper alignment
          bottom: 10,
          left: 15,
          right: 15,
        },
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw || 0;
            return value;
          },
        },
        bodyAlign: "center", // Align body content horizontally to the center
        titleAlign: "center", // Align title content horizontally to the center
      },
    },
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          position: "absolute",
          top: "20px",
          left: "20px",
        }}
      >
        <span
          style={{
            fontSize: "24px",
            fontWeight: "700",
            lineHeight: "33.6px",
            color: "#202223",
            textAlign: "left",
          }}
        >
          {title}
        </span>
        <span>
          {description.length > 0 && (
            <CustomTooltip description={description} />
          )}
        </span>
      </div>
      <Pie data={data} options={options} />
    </div>
  );
};
