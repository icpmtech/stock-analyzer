import React, { useState, useEffect } from 'react';
import { Box, Text, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Divider, Collapse, IconButton } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import DividendList from './DividendList'

const StockStats = ({ stockData }) => {
  const [companyDescription, setCompanyDescription] = useState('');
  const [dividendsInformation, setDividendsInformation] = useState({ dividends: [] }); // Initialize with empty array for dividends
  const [isOpenDescription, setIsOpenDescription] = useState(false);
  const [isOpenStatistics, setIsOpenStatistics] = useState(false);

  useEffect(() => {
    const fetchInformation = async (endpoint, message, setState) => {
      try {
        const response = await fetch(`http://localhost:3001/openai/${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userMessage: message
          }),
        });
        const data = await response.json();
        setState(data.choices[0].message.content);
      } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        setState('Failed to load data'); // Handle fetch error
      }
    };

    fetchInformation('chat', stockData.companyName, setCompanyDescription);
    fetchInformation('chat', 'give list dividends to ticker:' + stockData.companyName + ' as Json', json => {
      setDividendsInformation(JSON.parse(json)); // Parse and set the state
    });
  }, [stockData.companyName]);

  const toggleDescriptionCollapse = () => {
    setIsOpenDescription(!isOpenDescription);
  };

  const toggleStatisticsCollapse = () => {
    setIsOpenStatistics(!isOpenStatistics);
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
      <Box mb="4">
        <Text fontSize="xl" fontWeight="bold">{companyName}</Text>
      </Box>
      <Divider my="2" />
      <Box>
      <Text fontSize="xl" fontWeight="bold">Dividends</Text>
      <Divider my="2" />
      {/* Check if dividends array is available before rendering DividendList */}
      {dividendsInformation.dividends && <DividendList dividends={dividendsInformation.dividends} />}
      </Box>
      <Box mb="4">
        <IconButton
          icon={isOpenDescription ? <><Text fontSize="lg" fontWeight="bold">Description</Text> <ChevronUpIcon /></> : <><Text fontSize="lg" fontWeight="bold">AI Description</Text> <ChevronDownIcon /></>}
          aria-label={isOpenDescription ? 'Collapse' : 'Expand'}
          onClick={toggleDescriptionCollapse}
          variant="ghost"
          size="sm"
        />
        <Collapse in={isOpenDescription} animateOpacity>
          <Box mt="4">
            <Text>{companyDescription}</Text>
          </Box>
        </Collapse>
      </Box>
      <Divider my="2" />
      <Box>
        <IconButton
          icon={isOpenStatistics ? <><Text fontSize="lg" fontWeight="bold">Statistics</Text> <ChevronUpIcon /></> : <><Text fontSize="lg" fontWeight="bold">Statistics</Text> <ChevronDownIcon /></>}
          aria-label={isOpenStatistics ? 'Collapse' : 'Expand'}
          onClick={toggleStatisticsCollapse}
          variant="ghost"
          size="sm"
        />
        <Collapse in={isOpenStatistics} animateOpacity>
          <Box mt="4">
            <Stat>
              <StatLabel>Latest Price</StatLabel>
              <StatNumber>{latestPrice}</StatNumber>
              <StatHelpText>{latestTime}</StatHelpText>
            </Stat>
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
        </Collapse>
      </Box>
    </Box>
  );
};

export default StockStats;

