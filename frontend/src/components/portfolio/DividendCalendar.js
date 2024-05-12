import React, { useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Box, Button, Input, Text, VStack, List, ListItem, FormControl, useToast } from '@chakra-ui/react';

const DividendCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [dividends, setDividends] = useState([]);
  const [symbol, setSymbol] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const toast = useToast();  // Using Chakra's toast for notifications

  const fetchDividends = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:3001/api/dividends/${symbol}`);
      if (response.data && response.data.dividends) {
        setDividends(response.data.dividends);
      } else {
        setDividends([]);
        toast({
          title: "No dividends found.",
          description: "No dividend data available for the entered symbol.",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Failed to fetch dividends', error);
      setError('Failed to fetch dividends. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSymbolChange = (event) => {
    setSymbol(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!symbol) {
      toast({
        title: "Validation Error",
        description: "Please enter a stock symbol before submitting.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    fetchDividends();
  };

  const tileContent = ({ date: calendarDate, view }) => {
    if (view === 'month') {
      const formattedCalendarDate = calendarDate.toDateString();
      const dayDividends = dividends.filter(dividend => new Date(dividend.date).toDateString() === formattedCalendarDate);
      return (
        <List>
          {dayDividends.map((dividend, index) => (
            <ListItem key={index}>{dividend.amount}</ListItem>
          ))}
        </List>
      );
    }
  };

  return (
    <VStack spacing={4}>
      <FormControl as="form" onSubmit={handleSubmit}>
        <Input type="text" value={symbol} onChange={handleSymbolChange} placeholder="Enter Stock Symbol" mb={2} isDisabled={isLoading} aria-label="Stock Symbol"/>
        <Button colorScheme="blue" type="submit" isLoading={isLoading} isDisabled={isLoading} loadingText="Loading...">
          Load Dividends
        </Button>
      </FormControl>
      {error && <Text color="red.500">{error}</Text>}
      <Box w="100%">
        <Calendar
          onChange={setDate}
          value={date}
          tileContent={tileContent}
        />
      </Box>
    </VStack>
  );
}

export default DividendCalendar;
