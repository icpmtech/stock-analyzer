import React from 'react';
import { Box, Text, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Divider } from '@chakra-ui/react';

const StockStats = ({ stockData }) => {
  const {
    companyName,
    latestPrice,
    latestTime,
    change,
    changePercent,
    high,
    low,
    volume,
    marketCap,
    peRatio,
    week52High,
    week52Low,
    ytdChange,
    isUSMarketOpen
  } = stockData;

  return (
    <Box borderWidth="1px" borderRadius="lg" p="4">
      <Text fontSize="xl" fontWeight="bold" mb="4">{companyName}</Text>
      <Stat>
        <StatLabel>Latest Price</StatLabel>
        <StatNumber>{latestPrice}</StatNumber>
        <StatHelpText>{latestTime}</StatHelpText>
      </Stat>
      <Divider my="2" />
      <Stat>
        <StatLabel>Change</StatLabel>
        <StatNumber>{change}</StatNumber>
        <StatArrow type={change > 0 ? 'increase' : 'decrease'} />
        <StatHelpText>{changePercent}%</StatHelpText>
      </Stat>
      <Stat>
        <StatLabel>High</StatLabel>
        <StatNumber>{high}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Low</StatLabel>
        <StatNumber>{low}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Volume</StatLabel>
        <StatNumber>{volume}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Market Cap</StatLabel>
        <StatNumber>{marketCap}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>P/E Ratio</StatLabel>
        <StatNumber>{peRatio}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>52 Week High</StatLabel>
        <StatNumber>{week52High}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>52 Week Low</StatLabel>
        <StatNumber>{week52Low}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>YTD Change</StatLabel>
        <StatNumber>{ytdChange}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Market Status</StatLabel>
        <StatNumber>{isUSMarketOpen ? 'Open' : 'Closed'}</StatNumber>
      </Stat>
    </Box>
  );
};

export default StockStats;