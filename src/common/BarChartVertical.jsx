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
            size: "14px", // Change this value to adjust legend font size
            weight: "400", // Change font weight if needed
            color: "#6d7175",
          },
          padding: 20, // Add padding between legend items
          boxWidth: 15, // Width of the square dot
          boxHeight: 15,
        },
        position: "bottom",
      },
      title: {
        display: false,
        text: title,
        font: {
          size: 24, // Set the font size for the title
          family: "Arial, sans-serif", // Font family for the title
          weight: "700", // Font weight for the title
        },
        align: "start",
      },
    },
    scales: {
      x: {
        display: false,
        categoryPercentage: 1, // Adjusts space between categories (bars)
        barPercentage: 20,
      },
      y: {
        beginAtZero: true,
        max: max, // Set maximum value for y-axis
        ticks: {
          stepSize: stepsize, // Define the step size for y-axis
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
          width: "100%",
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          marginBottom: "20px",
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
      <Bar data={data} options={options} />
    </>
  );
};
