// MarketTicker.js
import React from 'react';
import { Box,Card, Text, useColorModeValue } from '@chakra-ui/react';
import '../styles.css'; // Assuming your styles are saved in this file

const TickerItem = ({ label, value, change, isPositive }) => {
  const textColor = useColorModeValue('gray.700', 'gray.100');
  const changeColor = useColorModeValue(isPositive ? 'green.500' : 'red.500', isPositive ? 'green.200' : 'red.200');

  return (
    <Box className="ticker-item" mr="4">
     
      <Text as="span" fontWeight="bold" color={textColor}>
        {label}:
      </Text>
      <Text as="span" color={textColor} mx="2">
        {value}
      </Text>
      <Text as="span" color={changeColor}>
        {change}
      </Text>
     
    </Box>
  );
};

const MarketTicker = ({ tickerData }) => {
  return (
    <Box className="ticker-container">
      {tickerData.map((item, index) => (
        <TickerItem
          key={index}
          label={item.label}
          value={item.value}
          change={item.change}
          isPositive={item.isPositive}
        />
      ))}
    </Box>
  );
};

export default MarketTicker;
