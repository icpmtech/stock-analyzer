import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Text, Button, Alert, AlertIcon, AlertTitle, AlertDescription,
  Grid, GridItem, Heading, Collapse, IconButton, useColorModeValue
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';

import { fetchStockData, prepareChartData } from '../StockDataUtils'; // Ensure these are properly exported
import SearchBar from '../SearchBar';
import MarketNewsFeed from '../MarketNewsFeed';
import StockChart from '../StockChart';
import StockStats from '../StockStats';

ChartJS.register(...registerables);

const StockDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [marketNews, setMarketNews] = useState([]);
  useEffect(() => {
    if (!searchQuery) return;
    const fetchMarketNews = async () => {
      try {
        setLoading(true);
        const newsResponse = await axios.get(`http://localhost:3001/api/news?search=${searchQuery}`);
        // Assume newsResponse.data.articles.results exists and is correct
        setMarketNews(newsResponse.data.articles.results.map(article => ({
          id: article.uri,
          title: article.title,
          url: article.url,
          publishedDate: article.dateTimePub,
          imageUrl: article.image || 'default_image_url',
          summary: article.body,
          source: article.source.title
        })));
      } catch (err) {
        console.error('Error fetching market news:', err);
        setError('Failed to fetch market news');
      } finally {
        setLoading(false);
      }
    };

    fetchMarketNews();
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("#autocomplete-container")) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000); // Clears error after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSearch = async (query) => {
    if (!query) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:3001/api/search-stocks?q=${query}`);
      setSuggestions(response.data);
      setShowSuggestions(true);
    } catch (err) {
      setError('Failed to fetch suggestions.');
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const selectStock = async (stock) => {
    setSearchQuery(stock.symbol);
    setShowSuggestions(false);
    setLoading(true);
    
    try {
      const response = await axios.get(`http://localhost:3001/api/stock-quote/${stock.symbol}`);
      setResults(response.data);
      setShowResults(true);
    } catch (err) {
      setError('Failed to fetch stock details.');
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box id="autocomplete-container" p={4}>
      <SearchBar value={searchQuery} onChange={(e) => {
        setSearchQuery(e);
        handleSearch(e);
      }} onSearch={() => handleSearch(searchQuery)} />

      {loading && <Text>Loading...</Text>}
      {error && (
        <Alert status="error" mt={4}>
          <AlertIcon />
          <Box flex="1">
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription display="block">{error}</AlertDescription>
          </Box>
        </Alert>
      )}

      {showSuggestions && (
        <Box mt={1} bg="gray.100" p={2} shadow="md">
          {suggestions.map((suggestion, index) => (
            <Box key={index} cursor="pointer"
              p={2} _hover={{ bg: "gray.200" }}
              onClick={() => selectStock(suggestion)}>
              {suggestion.name} ({suggestion.symbol})
            </Box>
          ))}
        </Box>
      )}

      <Grid
        templateColumns={{ md: '3fr 1fr', base: '1fr' }}
        gap={4}
        my={6}
      >
        <GridItem>
        <Heading mb={4}>Market News: ({results?.shortName})</Heading>
          <MarketNewsFeed newsList={marketNews} />
        </GridItem>
        <GridItem>
          <Heading mb={4}>Stock Summary</Heading>
          {showResults && results && (
            <Box>
              <StockStats stockData={results} />
              <IconButton
                icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                aria-label={isOpen ? 'Collapse' : 'Expand'}
                onClick={toggleCollapse}
                variant="ghost"
                size="sm"
              />
              <Collapse in={isOpen} animateOpacity>
                <Box mt="4">
                  {loading && <Text>Loading...</Text>}
                  {error && <Text>Error: {error}</Text>}
                  {results && <StockChart symbol={searchQuery} />}
                </Box>
              </Collapse>
            </Box>
          )}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default StockDashboard;
