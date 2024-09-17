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

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const BarChartHorizontal = () => {
  const data = {
    labels: ["January"],
    datasets: [
      {
        label: "Saudi Employees",
        data: [120],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Non-Saudi Employees",
        data: [555],
        backgroundColor: "rgba(153, 102, 255, 0.5)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y", // This makes the chart horizontal
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Saudization Chart",
        font: {
          size: 24, // Set the font size for the title
          family: "Arial, sans-serif", // Font family for the title
          weight: "700", // Font weight for the title
        },
        color: "#202223", // Color of the title text
        padding: {
          top: 10,
          bottom: 30,
        },
        align: "start",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 1000, // Set maximum value for x-axis (horizontal)
        ticks: {
          stepSize: 250, // Define the step size for x-axis
        },
        grid: {
          drawBorder: false, // Hide border lines
        },
      },
      y: {
        display: false, // Show y-axis labels
        grid: {
          display: false, // Hide grid lines
        },
      },
    },
  };

  return (
    <Bar
      data={data}
      options={options}
    
    />
  );
};
