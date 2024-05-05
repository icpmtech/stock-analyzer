import React, { useState, useEffect } from 'react';
import { Box, Text, Collapse, IconButton, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { fetchStockData, prepareChartData } from './StockDataUtils';
import zoomPlugin from 'chartjs-plugin-zoom';
ChartJS.register(...registerables,zoomPlugin);

const StockChart = ({ symbol }) => {
  const [chartDatas, setChartDatas] = useState({}); // Manage multiple datasets
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [timeFrame, setTimeFrame] = useState('1D'); // Default time frame

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const rawData = await fetchStockData(symbol, timeFrame);
        if (rawData) {
          const data = prepareChartData(rawData);
          setChartDatas(prevDatas => ({ ...prevDatas, [timeFrame]: data })); // Store data indexed by timeFrame
        } else {
          throw new Error('No data returned');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [symbol, timeFrame]); // Reload data when symbol or time frame changes

  const handleTabChange = (index) => {
    const frames = ['1D', '1M', '52W', 'ALL'];
    setTimeFrame(frames[index]);
  };
  const options = {
    scales: {
      'y-axis-open': {
        type: 'linear',
        position: 'left',
      },
      'y-axis-high': {
        type: 'linear',
        position: 'right',
        grid: { drawOnChartArea: false },
      },
      'y-axis-low': {
        type: 'linear',
        position: 'right',
        grid: { drawOnChartArea: false },
      },
      'y-axis-close': {
        type: 'linear',
        position: 'left',
      },
      'y-axis-adjusted': {
        type: 'linear',
        position: 'right',
        grid: { drawOnChartArea: false },
      },
      'y-axis-volume': {
        type: 'linear',
        position: 'right',
        grid: { drawOnChartArea: false },
      }
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true, // Enable zooming with mouse wheel
          },
          pinch: {
            enabled: true // Enable zooming with pinch gestures
          },
          mode: 'xy' // Enable zooming in both directions
        },
        pan: {
          enabled: true,
          mode: 'xy' // Enable panning in both directions
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };
  
  return (
    <Box borderWidth="1px" borderRadius="lg" p="4">
      <Tabs variant='unstyled' onChange={handleTabChange}>
        <TabList>
          <Tab _selected={{ color: 'white', bg: 'blue.500' }}>1D</Tab>
          <Tab _selected={{ color: 'white', bg: 'blue.500' }}>1M</Tab>
          <Tab _selected={{ color: 'white', bg: 'blue.500' }}>52 Weeks</Tab>
          <Tab _selected={{ color: 'white', bg: 'blue.500' }}>All</Tab>
        </TabList>
        <TabPanels>
          {['1D', '1M', '52W', 'ALL'].map((frame, index) => (
            <TabPanel key={index}>
              <IconButton
                icon={isOpen ? <><Text fontSize="lg" fontWeight="bold">Stock Chart</Text> <ChevronUpIcon /></> : <><Text fontSize="lg" fontWeight="bold">Stock Chart</Text> <ChevronDownIcon /></>}
                aria-label={isOpen ? 'Collapse' : 'Expand'}
                onClick={() => setIsOpen(!isOpen)}
                variant="ghost"
                size="sm"
              />
              <Collapse in={isOpen} animateOpacity>
                <Box borderWidth="1px" borderRadius="lg" p="4" mt="4">
                  {loading && <Text>Loading...</Text>}
                  {error && <Text>Error: {error}</Text>}
                  {chartDatas[frame] && <Line options={options} data={chartDatas[frame]} />}
                </Box>
              </Collapse>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default StockChart;
