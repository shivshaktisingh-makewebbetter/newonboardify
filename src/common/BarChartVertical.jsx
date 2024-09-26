import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { CustomTooltip } from "./CustomToolTip";

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const BarChartVertical = ({
  dataset,
  stepsize,
  max,
  title,
  description,
}) => {
  const data = {
    labels: [""],
    datasets: dataset,
  };

  const options = {
    responsive: true,
    plugins: {
      beforeDraw: function (chart) {
        const ctx = chart.ctx;
        ctx.save();

        chart.data.datasets.forEach((dataset, i) => {
          const meta = chart.getDatasetMeta(i);
          meta.data.forEach((bar, index) => {
            ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 5;
            ctx.shadowOffsetY = 5;

            // Draw the shadowed bar
            ctx.fillRect(
              bar.x - bar.width / 2,
              bar.y,
              bar.width,
              chart.chartArea.bottom - bar.y
            );
          });
        });

        ctx.restore();
      },
      legend: {
        labels: {
          font: {
            size: "14px",
            weight: "400",
            color: "#6d7175",
          },
          padding: 20,
          boxWidth: 15,
          boxHeight: 15,
        },
        position: "bottom",
      },
      title: {
        display: false,
        text: title,
        font: {
          size: 24,
          family: "Arial, sans-serif",
          weight: "700",
        },
        align: "start",
      },
      tooltip: {
        yAlign: 'top',      // Vertically align the tooltip to the top
        xAlign: 'center',  // Horizontally center the tooltip

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
          top: 10,
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
        bodyAlign: 'center', // Align tooltip body content horizontally to the center
        titleAlign: 'center', // Align tooltip title content horizontally to the center
      },
    },
    scales: {
      x: {
        display: false,
        categoryPercentage: 1,
        barPercentage: 20,
      },
      y: {
        beginAtZero: true,
        max: max,
        ticks: {
          stepSize: stepsize,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <>
      <div
        style={{
          width: "80%",
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
          {description.length > 0 && <CustomTooltip description={description} />}
        </span>
      </div>
      <Bar data={data} options={options} />
    </>
  );
};
