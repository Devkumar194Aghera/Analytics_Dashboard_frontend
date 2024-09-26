import React, { useState, useEffect } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import LineChart from "../components/LineChart";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import CandlestickChart from "../components/CandlestickChart";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [lineData, setLineData] = useState(null);
  const [barData, setBarData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [candData, setCandData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(false);
    try {
      const [lineRes, barRes, pieRes, candRes] = await Promise.all([
        axios.get(
          "https://analytics-dashboard-backend.onrender.com/api/line-chart-data/"
        ),
        axios.get(
          "https://analytics-dashboard-backend.onrender.com/api/bar-chart-data/"
        ),
        axios.get(
          "https://analytics-dashboard-backend.onrender.com/api/pie-chart-data/"
        ),
        axios.get(
          "https://analytics-dashboard-backend.onrender.com/api/candlestick-data/"
        ),
      ]);

      setLineData(lineRes.data);
      setBarData(barRes.data);
      setPieData(pieRes.data);
      setCandData(candRes.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching chart data:", error);
      setLoading(false);
      setError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-2xl font-bold text-gray-600">Loading...</span>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-red-500 mb-4">
            Oops! Failed to Load Data
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Something went wrong while fetching the data. Please try again
            later.
          </p>
          <button
            onClick={fetchData}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 transition duration-300"
          >
            Retry
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Heading with a background */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg shadow-md mb-12">
          <h1 className="text-5xl font-extrabold text-center text-white">
            Interactive Analytics Dashboard
          </h1>
        </div>

        {/* 2x2 Grid for Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Line Chart */}
          <div className="bg-gradient-to-b from-white to-gray-100 shadow-xl rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Line Chart
            </h2>
            <div style={{ height: "350px" }}>
              <LineChart data={lineData} />
            </div>
          </div>

          {/* Pie Chart (Centered) */}
          <div className="bg-gradient-to-b from-white to-gray-100 shadow-xl rounded-lg p-6 flex justify-center items-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center w-full">
              Pie Chart
            </h2>
            <div style={{ height: "350px" }} className="flex justify-center">
              <PieChart data={pieData} />
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-gradient-to-b from-white to-gray-100 shadow-xl rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Bar Chart
            </h2>
            <div style={{ height: "350px" }}>
              <BarChart data={barData} />
            </div>
          </div>

          {/* Candlestick Chart */}
          <div className="bg-gradient-to-b from-white to-gray-100 shadow-xl rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Candlestick Chart
            </h2>
            <div style={{ height: "350px" }}>
              <CandlestickChart data={candData} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
