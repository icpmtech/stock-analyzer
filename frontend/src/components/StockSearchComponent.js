import React, { useState } from 'react';
import SearchBar from './SearchBar';  // Assuming you have the SearchBar component
import axios from 'axios';
import { Box, Text } from '@chakra-ui/react';

const StockSearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://data.nasdaq.com/api/v3/datasets/${query}.json`, {
        params: {
          api_key: 'N9JrN7WaC6TM6hhb_XW-'
        }
      });
      setResults([response.data.dataset]);  // Assuming the response contains the dataset object
    } catch (err) {
      setError('Failed to fetch data. Please check the dataset code.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={4}>
      <SearchBar value={searchQuery} onChange={setSearchQuery} onSearch={handleSearch} />
      {loading && <Text>Loading...</Text>}
      {error && <Text color="red.500">{error}</Text>}
      {results.map((result, index) => (
        <Box key={index} mt={4}>
          <Text fontWeight="bold">{result.name}</Text>
          <Text>Start Date: {result.start_date}</Text>
          <Text>End Date: {result.end_date}</Text>
          <Text>Description: {result.description}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default StockSearchComponent;
