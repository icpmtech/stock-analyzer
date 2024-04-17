import React, { useState } from 'react';
import {
  Box,
  Grid,
  GridItem,
  Heading,
  useColorModeValue
} from '@chakra-ui/react';

import MarketNewsFeed from './MarketNewsFeed';
import StockSummaryList from './StockSummaryList';
import MarketTicker from './MarketTicker';
// Mock data for market news
const fakeMarketNews = [
  {
    id: 1,
    title: 'Why the 2024 stock market looks a lot like 2023',
    summary: 'The rally is being defined by megacap tech winners, just like it was a year ago.',
    imageUrl: 'https://via.placeholder.com/150',
  },
  // ... more news items
];

// Mock data for stock summary
const fakeStockData = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: '$175.96',
    change: '+1.15%',
  },
  // ... more stocks
];
const tickerData = [
  { label: 'S&P Futures', value: '5,115.25', change: '+227.5 (0.4467%)', isPositive: true },
  // ...other tickerData items
];
const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  // Initialize the state with the mock data
  const [marketNews, setMarketNews] = useState(fakeMarketNews);
  const [stockData, setStockData] = useState(fakeStockData);

  // If you were fetching data, you would use useEffect here

  const handleChange = (event) => setSearchQuery(event.target.value);

  const bgColor = useColorModeValue('gray.50', 'gray.800');

  return (
    <Box bg={bgColor} minH="100vh" p={5}>
     
      <MarketTicker tickerData={tickerData} /> 
      <Grid
        templateColumns={{ md: '3fr 1fr', base: '1fr' }}
        gap={4}
        my={6}
      >
        <GridItem>
          <Heading mb={4}>Market News</Heading>
          <MarketNewsFeed newsList={marketNews} />
        </GridItem>
        <GridItem >
          <Heading mb={4}>Stock Summary</Heading>
          <StockSummaryList stocks={stockData} />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Home;
