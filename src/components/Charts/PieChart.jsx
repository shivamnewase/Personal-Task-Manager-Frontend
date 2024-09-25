import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function PieChartWithTotal({ taskStatusList }) {
  // Prepare data for the Pie chart
  const labels = taskStatusList.map((item) => item._id);
  const dataValues = taskStatusList.map((item) => item.count);

  // Calculate the total count
  const totalCount = dataValues.reduce((sum, value) => sum + value, 0);

  // Chart data configuration
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Task Status",
        data: dataValues,
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#ffce56",
          "#4bc0c0",
          "#ff9f40",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options configuration
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Total Tasks: ${totalCount}`, // Display total tasks in the title
      },
    },
  };

  return (
    <div style={{ width: "590px", height: "425px" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
}
