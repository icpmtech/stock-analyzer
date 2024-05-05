import React, { useState, useEffect } from 'react';
import { Box, Text, Button, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import SearchBar from './SearchBar';  // Ensure that SearchBar properly handles the props and events.
import axios from 'axios';
import {
  Grid,
  GridItem,
  Heading,
  useColorModeValue
} from '@chakra-ui/react';
import MarketNewsFeed from './MarketNewsFeed';
import StockChart from './StockChart';
 import StockStats from './StockStats';
 
const StockSearchComponent = () => {
    const [searchQuery, setSearchQuery] = useState('AAPL');
    const [results, setResults] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showResults, setShowResults] = useState(true);
    const [marketNews, setMarketNews] = useState([]);
  
  
  
    useEffect(() => {
        if (!searchQuery) return;  // Don't fetch if the search query is empty

       

        const fetchMarketNews = async () => {
            try {
                setLoading(true);
                const newsResponse = await axios.get(`http://localhost:3001/api/news?search=${searchQuery}`);
                setMarketNews(newsResponse.data.articles.results.map(article => ({
                    id: article.uri,
                    title: article.title,
                    url: article.url,
                    publishedDate: article.dateTimePub,
                    imageUrl: article.image || 'default_image_url',
                    summary: article.body,
                    source: article.source.title
                })));
            } catch (error) {
                console.error('Error fetching market news:', error);
                setError('Failed to fetch market news');
            }
            setLoading(false);
        };

       
        fetchMarketNews();
    }, [searchQuery]);  // Re-run these effects when searchQuery changes
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

    const handleClose = () => {
        setShowResults(false); // Hide results
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
        <GridItem >
          <Heading mb={4}>Market News: ({results?.shortName})</Heading>
          <MarketNewsFeed newsList={marketNews} />
        </GridItem>
        <GridItem >
          <Heading mb={4}>Stock Summary</Heading>
          {showResults && results && (
            <> <StockStats stockData={results} ></StockStats>
            <StockChart symbol={searchQuery} />
          
            </> 
            )}
        </GridItem>
      </Grid>
        </Box>
      
    );
};

export default StockSearchComponent;
