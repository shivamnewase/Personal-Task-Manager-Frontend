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

// Register the components you need
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BasicBars({ taskPriorityList }) {
  // Prepare the data for the BarChart
  const xAxisData = ['Medium', 'Low', 'High', 'Lowest']; // Extract _id values for x-axis
  
  const seriesData = taskPriorityList.map((item) => item.count); // Extract count values for series data
 

  // Define custom colors for each bar
  const barColors = {
    Medium: "#ffce56",
    Low: "#4bc0c0",
    High: "#ff6384",
    Highest: "#36a2eb",
    Lowest: "#c384c1",
  };

  
  const backgroundColors = seriesData.map(
    (_, index) => barColors[xAxisData[index]] || "#000"
  ); 

  // Chart data configuration
  const data = {
    labels: xAxisData,
    datasets: [
      {
        label: "Task Count",
        data: seriesData,
        backgroundColor: backgroundColors,
        borderWidth: 0,
      },
    ],
  };

  // Chart options configuration
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Prevent default aspect ratio
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Task Priorities",
      },
    },
  };

  return (
    <div style={{ width: "590px", height: "425px" }}> 
      <Bar 
        data={data} 
        options={options} 
      />
    </div>
  );
}
