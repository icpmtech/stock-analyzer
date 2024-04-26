// src/components/Header.js
import React, { useState } from 'react';
import { Flex, Text, Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import StockSearchTiingoComponent from './StockSearchTiingoComponent';
import { useLocation } from 'react-router-dom';
function Header() {
 
  return (
    <Flex as="nav" p={4} justifyContent="space-between" alignItems="center" bg="blue.500" color="white">
    <Text fontSize="lg" fontWeight="bold">Stock Analyzer</Text>
    <Flex>
        <ChakraLink as={Link} to="/" px={2}>Home</ChakraLink>
        <ChakraLink as={Link} to="/stock-chart" px={2}>Stock Chart</ChakraLink>
        <ChakraLink as={Link} to="/holdings" px={2}>My Holdings</ChakraLink>
        <ChakraLink as={Link} to="/login" px={2}>Login</ChakraLink>
        <ChakraLink as={Link} to="/register" px={2}>Register</ChakraLink>
    </Flex>
</Flex>
  );
}

export default Header;
