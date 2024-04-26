import React, { useState, useEffect } from 'react';
import { Box, Text, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Divider, Collapse, IconButton } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

const StockStats = ({ stockData }) => {
  const [chatCompletion, setChatCompletion] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchChatCompletion = async () => {
      try {
        const response = await fetch('http://localhost:3001/openai/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userMessage: stockData.companyName // You can customize this message
          }),
        });

        const data = await response.json();
        setChatCompletion(data.choices[0].message.content);
      } catch (error) {
        console.error('Error fetching chat completion:', error);
      }
    };

    fetchChatCompletion();
  }, [stockData]);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

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
      <Divider my="2" />
      <IconButton
        icon={isOpen ? <><Text fontSize="lg" fontWeight="bold">AI Description</Text> <ChevronUpIcon /></> : <><Text fontSize="lg" fontWeight="bold">AI Description</Text> <ChevronDownIcon /></>}
        aria-label={isOpen ? 'Collapse' : 'Expand'}
        onClick={toggleCollapse}
        variant="ghost"
        size="sm"
      />
      <Collapse in={isOpen} animateOpacity>
        <Box mt="4">
          <Text>{chatCompletion}</Text>
        </Box>
      </Collapse>
      <Divider my="2" />
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
