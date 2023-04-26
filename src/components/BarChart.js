import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  LinearScale,
  BarElement,
  CategoryScale,
  Tooltip,
  Legend
} from "chart.js";

import useMediaQuery from '@mui/material/useMediaQuery';

ChartJS.register(LinearScale, BarElement, CategoryScale, Tooltip, Legend);




const BarChart = ({ data, chartName }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: chartName,
        data: Object.values(data),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        type: "linear",
        beginAtZero: true,
      },
    }
  };

  const isMobile = useMediaQuery('(min-width:600px)');

  return (
    <div style={{ maxHeight: "100vh", width: isMobile ? "70vw":"90vw" }}>
      <h3>{chartName}</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
