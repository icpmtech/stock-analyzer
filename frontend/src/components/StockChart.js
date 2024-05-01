import React, { useState, useEffect } from 'react';
import { Box, Text, Collapse, IconButton } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';

import { fetchStockData, prepareChartData } from './StockDataUtils'; // Ensure these are properly exported

ChartJS.register(...registerables);

const StockChart = ({ symbol }) => {
  const [chartData, setChartData] = useState(null); // Initialize to null for conditional rendering
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state
  const [isOpen, setIsOpen] = useState(false); // Track collapse state

  useEffect(() => {
    const loadData = async () => {
      setLoading(true); // Begin loading
      try {
        const rawData = await fetchStockData(symbol);
        if (rawData) {
          // Check if rawData is not null or undefined
          const data = prepareChartData(rawData);
          setChartData(data);
          setError(null); // Reset error state on successful load
        } else {
          throw new Error('No data returned'); // Handle case where no data is returned
        }
      } catch (err) {
        setError(err.message); // Set error message
        setChartData(null); // Reset chart data on error
      } finally {
        setLoading(false); // End loading regardless of result
      }
    };

    loadData();
  }, [symbol]); // Dependency array includes symbol to reload data when it changes

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" p="4">
      <Box mb="4">
        <IconButton
          icon={isOpen ? <><Text fontSize="lg" fontWeight="bold">Stock Chart</Text> <ChevronUpIcon /></> : <><Text fontSize="lg" fontWeight="bold">Stock Chart</Text> <ChevronDownIcon /></>}
          aria-label={isOpen ? 'Collapse' : 'Expand'}
          onClick={toggleCollapse}
          variant="ghost"
          size="sm"
        />
      </Box>
      <Collapse in={isOpen} animateOpacity>
        <Box mt="4">
          <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {chartData && <Line data={chartData} />}
          </div>
        </Box>
      </Collapse>
    </Box>
  );
};

export default StockChart;
