import React, { useState, useEffect } from 'react';
import { Box, Text, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Divider, Collapse, IconButton } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import DividendList from './DividendList'

const StockStats = ({ stockData }) => {
  const [companyDescription, setCompanyDescription] = useState('');
  const [dividendsInformation, setDividendsInformation] = useState({ dividends: [] }); // Initialize with empty array for dividends
  const [isOpenDescription, setIsOpenDescription] = useState(false);
  const [isOpenStatistics, setIsOpenStatistics] = useState(false);
  const [isOpenDividends, setIsOpenDividends] = useState(false);
  
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

    fetchInformation('chat', stockData.shortName, setCompanyDescription);
    fetchInformation('chat', 'give list dividends to ticker:' + stockData.shortName + ' as Json', json => {
      setDividendsInformation(JSON.parse(json)); // Parse and set the state
    });
  }, [stockData.shortName]);

  const toggleDescriptionCollapse = () => {
    setIsOpenDescription(!isOpenDescription);
  };

  const toggleStatisticsCollapse = () => {
    setIsOpenStatistics(!isOpenStatistics);
  };
  const toggleDividendsCollapse = () => {
    setIsOpenDividends(!isOpenDividends);
  };

  

  const {
    shortName,
    regularMarketPrice ,
    regularMarketTime , 
    regularMarketChange,
    regularMarketChangePercent ,
    regularMarketDayHigh ,
    regularMarketDayLow ,
    regularMarketVolume ,
    marketCap,
    trailingPE ,
    fiftyTwoWeekHigh ,
    fiftyTwoWeekLow ,
    ytdChange,
    marketState
  } = stockData;
  const isUSMarketOpen = marketState === 'REGULAR'
  return (
    <Box borderWidth="1px" borderRadius="lg" p="4">
      <Box mb="4">
        <Text fontSize="xl" fontWeight="bold">{shortName}</Text>
      </Box>
      <Divider my="2" />
      <Box>
      <Text fontSize="xl" fontWeight="bold"></Text>
      <IconButton
       icon={isOpenDividends ? <><Text fontSize="lg" fontWeight="bold">Dividends</Text> <ChevronUpIcon /></> : <><Text fontSize="lg" fontWeight="bold">Dividends</Text> <ChevronDownIcon /></>}
       aria-label={isOpenDividends ? 'Collapse' : 'Expand'}
       onClick={toggleDividendsCollapse}
       variant="ghost"
       size="sm"
     />
      <Divider my="2" />
      {/* Check if dividends array is available before rendering DividendList */}
      {dividendsInformation.dividends && 
     <Collapse in={isOpenDividends} animateOpacity>  <DividendList dividends={dividendsInformation.dividends} /></Collapse>
      }
      </Box>
      <Box mb="4">
        <IconButton
          icon={isOpenDescription ? <><Text fontSize="lg" fontWeight="bold">Description</Text> <ChevronUpIcon /></> : <><Text fontSize="lg" fontWeight="bold">Description</Text> <ChevronDownIcon /></>}
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
        <StatLabel>Company Name</StatLabel>
        <StatNumber>{shortName}</StatNumber>
    </Stat>
    <Stat>
        <StatLabel>Latest Price</StatLabel>
        <StatNumber>${regularMarketPrice?.toFixed(2)}</StatNumber>
        <StatHelpText>{new Date(regularMarketTime * 1000).toLocaleString()}</StatHelpText>
    </Stat>
    <Stat>
        <StatLabel>Change</StatLabel>
        <StatNumber>${regularMarketChange?.toFixed(2)}</StatNumber>
        <StatArrow type={regularMarketChange > 0 ? 'increase' : 'decrease'} />
        <StatHelpText>{regularMarketChangePercent?.toFixed(2)}%</StatHelpText>
    </Stat>
    <Stat>
        <StatLabel>High Today</StatLabel>
        <StatNumber>${regularMarketDayHigh?.toFixed(2)}</StatNumber>
    </Stat>
    <Stat>
        <StatLabel>Low Today</StatLabel>
        <StatNumber>${regularMarketDayLow?.toFixed(2)}</StatNumber>
    </Stat>
    <Stat>
        <StatLabel>Volume</StatLabel>
        <StatNumber>{regularMarketVolume.toLocaleString()}</StatNumber>
    </Stat>
    <Stat>
        <StatLabel>Market Cap</StatLabel>
        <StatNumber>${marketCap.toLocaleString()}</StatNumber>
    </Stat>
    <Stat>
        <StatLabel>P/E Ratio</StatLabel>
        <StatNumber>{trailingPE?.toFixed(2)}</StatNumber>
    </Stat>
    <Stat>
        <StatLabel>52 Week High</StatLabel>
        <StatNumber>${fiftyTwoWeekHigh?.toFixed(2)}</StatNumber>
    </Stat>
    <Stat>
        <StatLabel>52 Week Low</StatLabel>
        <StatNumber>${fiftyTwoWeekLow?.toFixed(2)}</StatNumber>
    </Stat>
    <Stat>
        <StatLabel>YTD Change</StatLabel>
        <StatNumber>{ytdChange ? `${ytdChange?.toFixed(2)}%` : 'N/A'}</StatNumber>
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
