import React, { useState, useEffect } from 'react';
import { Box, Text, Button, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import SearchBar from './SearchBar';  // Ensure that SearchBar properly handles the props and events.
import axios from 'axios';

const StockSearchComponent = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showResults, setShowResults] = useState(true);

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
        setSearchQuery(stock.name);
        setShowSuggestions(false);
        setLoading(true);
        
        try {
            const response = await axios.get(`http://localhost:3001/api/stock-details/${stock.symbol}`);
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
            {showResults && results && (
                <Box mt={4}>
                    <Text fontWeight="bold">{results.name} ({results.ticker})</Text>
                    <Text>Open Today: {results.open}</Text>
                    <Text>High Today: {results.high}</Text>
                    <Text>Low Today: {results.low}</Text>
                    <Text>Last: {results.last}</Text>
                    <Text>Prev Close: {results.prevClose}</Text>
                    <Button onClick={handleClose} colorScheme="red">Close</Button>
                </Box>
            )}
        </Box>
    );
};

export default StockSearchComponent;
