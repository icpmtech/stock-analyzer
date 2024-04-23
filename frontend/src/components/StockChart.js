import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

import { fetchStockData, prepareChartData } from './StockDataUtils'; // Ensure these are properly exported

const StockChart = ({ symbol }) => {
  const [chartData, setChartData] = useState(null);  // Initialize to null for conditional rendering
  const [loading, setLoading] = useState(true);      // Track loading state
  const [error, setError] = useState(null);          // Track error state

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);  // Begin loading
      try {
        const rawData = await fetchStockData(symbol);
        if (rawData) {  // Check if rawData is not null or undefined
          const data = prepareChartData(rawData);
          setChartData(data);
          setError(null);  // Reset error state on successful load
        } else {
          throw new Error('No data returned');  // Handle case where no data is returned
        }
      } catch (err) {
        setError(err.message);  // Set error message
        setChartData(null);  // Reset chart data on error
      } finally {
        setLoading(false);  // End loading regardless of result
      }
    };

    loadData();
  }, [symbol]);  // Dependency array includes symbol to reload data when it changes

  return (
    <div>
      <h2>{symbol} Stock Chart</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {chartData && <Line data={chartData} />}
    </div>
  );
};

export default StockChart;
