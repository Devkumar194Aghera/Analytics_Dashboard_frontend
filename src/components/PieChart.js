import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

// Register necessary chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  // Chart data configuration
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Pie Dataset",
        data: data.data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        hoverBackgroundColor: [
          "rgba(255, 99, 132, 0.9)",
          "rgba(54, 162, 235, 0.9)",
          "rgba(255, 206, 86, 0.9)",
          "rgba(75, 192, 192, 0.9)",
          "rgba(153, 102, 255, 0.9)",
          "rgba(255, 159, 64, 0.9)",
        ],
      },
    ],
  };

  // Chart options configuration
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top", // Position legend at the top
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    hover: {
      mode: "nearest",
      intersect: true, // Hover behavior for nearest intersection
    },
  };

  return (
    <div
      className="flex justify-center items-center"
      style={{ height: "100%", width: "100%" }}
    >
      <div style={{ height: "300px", width: "300px" }}>
        {" "}
        {/* Chart size control */}
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
