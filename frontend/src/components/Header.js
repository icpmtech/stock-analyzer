// src/components/Header.js
import React, { useState } from 'react';
import { Flex, Text, Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import StockSearchTiingoComponent from './StockSearchTiingoComponent';
import { useLocation } from 'react-router-dom';
function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const shouldDisplaySearch = location.pathname !== '/login' && location.pathname !== '/register';

  // If you were fetching data, you would use useEffect here

  const handleChange = (event) => setSearchQuery(event.target.value);
  return (
    <Flex  p={4} justifyContent="space-between" alignItems="center">
      <Text fontSize="lg" fontWeight="bold">Stock Analizer</Text>
      {shouldDisplaySearch && (<Flex>
      <StockSearchTiingoComponent  />
        </Flex>)}
      <Flex>
        <ChakraLink as={Link} to="/" p={2} style={{ textDecoration: 'none' }}>Home</ChakraLink>
        <ChakraLink as={Link} to="/stock-chart"  p={2} style={{ textDecoration: 'none' }} >Stock Chart</ChakraLink>
        <ChakraLink as={Link} to="/news" p={2} style={{ textDecoration: 'none' }}>News</ChakraLink>
        <ChakraLink as={Link} to="/finance" p={2} style={{ textDecoration: 'none' }}>Finance</ChakraLink>
        <ChakraLink as={Link} to="/weather" p={2} style={{ textDecoration: 'none' }}>Weather</ChakraLink>
        <ChakraLink as={Link} to="/holdings" p={2} style={{ textDecoration: 'none' }}>My Holdings</ChakraLink>
        <ChakraLink as={Link} to="/login" p={2} style={{ textDecoration: 'none' }}>Login</ChakraLink>
        <ChakraLink as={Link} to="/register" p={2} style={{ textDecoration: 'none' }}>Register</ChakraLink>
      </Flex>
    </Flex>
  );
}

export default Header;
