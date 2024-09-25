import React from "react";
import dynamic from "next/dynamic";

// Dynamically import ReactApexChart to avoid SSR issues with ApexCharts
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const CandlestickChart = ({ data }) => {
  // Format the data for the candlestick chart
  const formattedData = data?.data?.map((item) => ({
    x: new Date(item.x).getTime(), // Convert date to timestamp
    y: [item.open, item.high, item.low, item.close], // OHLC values
  }));

  // Define the series for the chart
  const series = [
    {
      name: "Candlestick Data",
      data: formattedData || [], // Use formatted data or an empty array if unavailable
    },
  ];

  // Configure chart options
  const options = {
    chart: {
      type: "candlestick",
      height: 350,
      background: "#ffffff", // Set background color to white
    },
    title: {
      text: "Candlestick Chart",
      align: "left",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        color: "#333", // Title text color
      },
    },
    xaxis: {
      type: "datetime", // X-axis based on datetime
      labels: {
        style: {
          colors: "#333", // X-axis label color
          fontSize: "12px", // X-axis label font size
        },
      },
    },
    yaxis: {
      tooltip: {
        enabled: true, // Enable tooltip for Y-axis
      },
      labels: {
        style: {
          colors: "#333", // Y-axis label color
          fontSize: "12px", // Y-axis label font size
        },
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#4BC0C0", // Color for upward candles
          downward: "#F7464A", // Color for downward candles
        },
        wick: {
          useFillColor: true, // Use the same color for the wick as the candle body
        },
      },
    },
    grid: {
      borderColor: "#e7e7e7", // Grid line color
      strokeDashArray: 4, // Dotted grid lines
    },
    tooltip: {
      theme: "light", // Tooltip theme
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="candlestick"
        height={350}
      />
    </div>
  );
};

export default CandlestickChart;
