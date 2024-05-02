import React from 'react';
import { Box, Text, VStack, HStack, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import { Sparklines, SparklinesLine } from 'react-sparklines';

const HoldingDetail = ({ holding }) => {
  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" overflow="hidden" m={2}>
      <VStack align="stretch" spacing={4}>
        <HStack justifyContent="space-between">
          <Stat>
            <StatLabel>Symbol</StatLabel>
            <StatNumber>{holding.symbol}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Status</StatLabel>
            <StatNumber>{holding.status}</StatNumber>
          </Stat>
        </HStack>
        <HStack justifyContent="space-between">
          <Stat>
            <StatLabel>Shares</StatLabel>
            <StatNumber isNumeric>{holding.shares}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Last Price</StatLabel>
            <StatNumber isNumeric>${holding.lastPrice?.toFixed(2)}</StatNumber>
          </Stat>
        </HStack>
        <HStack justifyContent="space-between">
          <Stat>
            <StatLabel>Avg Cost / Share</StatLabel>
            <StatNumber isNumeric>${holding.avgCost?.toFixed(2)}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Total Cost</StatLabel>
            <StatNumber isNumeric>${holding.totalCost?.toFixed(2)}</StatNumber>
          </Stat>
        </HStack>
        <Box>
          <Text fontSize="md" fontWeight="bold" mb={2}>Market Value Trend:</Text>
          <Sparklines data={holding.marketValueTrend} limit={5} width={100} height={20} margin={5}>
            <SparklinesLine color="blue" />
          </Sparklines>
        </Box>
      </VStack>
    </Box>
  );
};

export default HoldingDetail;
