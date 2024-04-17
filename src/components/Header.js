// src/components/Header.js
import React, { useState } from 'react';
import { Flex, Text, Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import SearchBar from './SearchBar';
function Header() {
  const [searchQuery, setSearchQuery] = useState('');


  // If you were fetching data, you would use useEffect here

  const handleChange = (event) => setSearchQuery(event.target.value);
  return (
    <Flex  p={4} justifyContent="space-between" alignItems="center">
      <Text fontSize="lg" fontWeight="bold">Yahoo Dashboard</Text>
      <Flex>
      <SearchBar value={searchQuery} onChange={handleChange} />
        </Flex>
      <Flex>
        <ChakraLink as={Link} to="/" p={2} style={{ textDecoration: 'none' }}>Home</ChakraLink>
        <ChakraLink as={Link} to="/news" p={2} style={{ textDecoration: 'none' }}>News</ChakraLink>
        <ChakraLink as={Link} to="/finance" p={2} style={{ textDecoration: 'none' }}>Finance</ChakraLink>
        <ChakraLink as={Link} to="/weather" p={2} style={{ textDecoration: 'none' }}>Weather</ChakraLink>
      </Flex>
    </Flex>
  );
}

export default Header;
