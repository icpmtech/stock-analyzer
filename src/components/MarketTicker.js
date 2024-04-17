// MarketTicker.js
import React from 'react';
import { Flex, Text, Box, Icon, useColorModeValue } from '@chakra-ui/react';
import { MdTrendingUp, MdTrendingDown } from 'react-icons/md';

const TickerItem = ({ label, value, change, isPositive }) => {
  const iconColor = useColorModeValue(isPositive ? 'green.500' : 'red.500', isPositive ? 'green.200' : 'red.200');
  const textColor = useColorModeValue('gray.700', 'gray.100');

  return (
    <Flex align="center" m={2}>
      <Text fontWeight="bold" color={textColor} mr={2}>{label}</Text>
      <Text color={textColor}>{value}</Text>
      <Flex color={iconColor} ml={2} align="center">
        <Icon as={isPositive ? MdTrendingUp : MdTrendingDown} />
        <Text as="span" ml={1}>{change}</Text>
      </Flex>
    </Flex>
  );
};

const MarketTicker = () => {
  const tickerData = [
    { label: 'S&P Futures', value: '5,115.25', change: '+227.5 (0.4467%)', isPositive: true },
    // ...other tickerData items
  ];

  return (
    <Flex direction="row" wrap="nowrap" overflowX="auto">
      {tickerData.map((item, index) => (
        <TickerItem
          key={index}
          label={item.label}
          value={item.value}
          change={item.change}
          isPositive={item.isPositive}
        />
      ))}
    </Flex>
  );
};

export default MarketTicker;
