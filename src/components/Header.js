// src/components/Header.js
import { Flex, Text, Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Flex bg="blue.500" color="white" p={4} justifyContent="space-between" alignItems="center">
      <Text fontSize="lg" fontWeight="bold">Yahoo Dashboard</Text>
      <Flex>
        {/* Navigation Items as Links */}
        <ChakraLink as={Link} to="/" p={2} style={{ textDecoration: 'none' }}>Home</ChakraLink>
        <ChakraLink as={Link} to="/news" p={2} style={{ textDecoration: 'none' }}>News</ChakraLink>
        <ChakraLink as={Link} to="/finance" p={2} style={{ textDecoration: 'none' }}>Finance</ChakraLink>
        <ChakraLink as={Link} to="/weather" p={2} style={{ textDecoration: 'none' }}>Weather</ChakraLink>
      </Flex>
    </Flex>
  );
}

export default Header;
