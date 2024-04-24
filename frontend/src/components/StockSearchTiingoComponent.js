import React, { useState } from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import SearchBar from './SearchBar';  // Assuming the SearchBar is correctly implemented and imported
import axios from 'axios';
const StockSearchComponent = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showResults, setShowResults] = useState(true); // State to control the display of results

    const handleSearch = async (query) => {
        setLoading(true);
        setError(null);
        try {
            // Simulate an API call
            const response = await axios.get(`http://localhost:3001/api/tiingo/daily/${query}`);
            setResults(response.data);
            setShowResults(true); // Show results after fetching
        } catch (err) {
            setError('Failed to fetch data.');
            setResults(null);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setShowResults(false); // Hide results
    };

    return (
        <Box p={4}>
            <SearchBar value={searchQuery} onChange={setSearchQuery} onSearch={handleSearch} />
            {loading && <Text>Loading...</Text>}
            {error && <Text color="red.500">{error}</Text>}
            {showResults && results && (
                <Box mt={4}>
                    <Text fontWeight="bold">{results.name} ({results.ticker})</Text>
                    <Text>Description: {results.description}</Text>
                    <Button onClick={handleClose} colorScheme="red">Close</Button>
                </Box>
            )}
        </Box>
    );
};

export default StockSearchComponent;
