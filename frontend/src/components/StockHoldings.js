import React,{ useState, useEffect }  from 'react';
import axios from 'axios'; // Import axios
import { Box,Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import PortfolioStats  from  './portfolio/PortfolioStats';
import PortfolioFundamentals  from  './portfolio/PortfolioFundamentals';
import PortfolioHoldings  from  './portfolio/PortfolioHoldings';
import PortfolioSummary  from  './portfolio/PortfolioSummary';
const StockHoldings = () => {

  const [holdings, setHoldings] = useState([]); // Initialize state for holdings data

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const response = await axios.get('http://localhost:3001/portfolioHoldings'); // Adjust URL as necessary
        setHoldings(response.data); // Set state with fetched data
      } catch (error) {
        console.error('Failed to fetch holdings:', error);
      }
    };

    fetchHoldings();
  }, []); // Empty dependency array ensures this runs once on mount


  const statsData = {
    cashHoldings: 6287.89,
    dayGain: { value: "+66.85", percentage: "+1.07" },
    totalGain: { value: "-598.85", percentage: "-8.70" },
    annualPerformance: "^GSPCPortfolio",
    gainData: {
      dayGainTrend: [60, 62, 61, 63, 64],
      totalGainTrend: [-550, -560, -580, -590, -598.85],
      annualPerformanceTrend: [1.05, 1.06, 1.07, 1.08, 1.09]  // Hypothetical performance index over time
    }
  };
  const stockData = [
    {
      symbol: "PFE",
      lastPrice: "27.18",
      marketCap: "153.908B",
      avgVol: "40.98M",
      epsNextYear: "2.73",
      forwardPE: "9.96",
      divPaymentDate: "Jun 13, 2024",
      exDivDate: "May 09, 2024",
      divPerShare: "1.64",
      forwardAnnualDivRate: "1.68",
      forwardAnnualDivYield: "6.18%",
      trailingAnnualDivRate: "1.64",
      trailingAnnualDivYield: "6.40%",
      priceBook: "1.72",
      trendData: [1.9, 2.0, 2.1, 2.05, 2.1]
    },
    {
      symbol: "AAPL",
      lastPrice: "150.00",
      marketCap: "2T",
      avgVol: "30M",
      epsNextYear: "5.23",
      forwardPE: "25",
      divPaymentDate: "2024-06-01",
      exDivDate: "2024-05-10",
      divPerShare: "0.82",
      forwardAnnualDivRate: "3.28",
      forwardAnnualDivYield: "2.1%",
      trailingAnnualDivRate: "3.16",
      trailingAnnualDivYield: "2.0%",
      priceBook: "12",
      trendData: [1.9, 2.0, 2.1, 2.05, 2.1]
    }
    // Additional stock data here
  ];
  return (
    <Box p={4}>
    <PortfolioStats {...statsData} />
      <Tabs>
  <TabList>
    <Tab>Summary</Tab>
    <Tab>My Holdings</Tab>
    <Tab>Fundamentals</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <PortfolioSummary holdings={holdings} />
    </TabPanel>
    <TabPanel>
    <PortfolioHoldings holdings={holdings} />
    </TabPanel>
    <TabPanel>
    <PortfolioFundamentals holdings={stockData} setHoldings={setHoldings} />
    </TabPanel>
  </TabPanels>
</Tabs>
     
      
    </Box>
  );
};

export default StockHoldings;
