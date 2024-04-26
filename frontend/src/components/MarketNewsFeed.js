// MarketNewsFeed.js
import React, { useState } from 'react';
import {
  Box,
  Button,
  Text,
  Stack,
  Flex,
  Select,
  useToast
} from '@chakra-ui/react';
import MarketNewsCard from "./MarketNewsCard";

const MarketNewsFeed = ({ newsList }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const toast = useToast();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newsList.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(newsList.length / itemsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <Stack spacing={4}>
      {currentItems.map(news => (
        <MarketNewsCard key={news.id} news={news} />
      ))}
        <Flex justify="center" mt={8}>
        <Stack direction="row" spacing={4}>
          {currentPage > 1 && (
            <Button onClick={() => paginate(1)} colorScheme="blue">1</Button>
          )}
          {currentPage > 3 && <Text mx={2}>...</Text>}
          {pageNumbers.slice(Math.max(currentPage - 2, 1), Math.min(currentPage + 1, totalPages)).map(number => (
            <Button
              key={number}
              onClick={() => paginate(number)}
              colorScheme="blue"
              variant={currentPage === number ? "solid" : "outline"}
            >
              {number}
            </Button>
          ))}
          {currentPage < totalPages - 2 && <Text mx={2}>...</Text>}
          {currentPage < totalPages && (
            <Button onClick={() => paginate(totalPages)} colorScheme="blue">
              {totalPages}
            </Button>
          )}
        </Stack>
      </Flex>

      <Flex justify="center" alignItems="center" mt={2}>
        <Text mr={2}>Items per page:</Text>
        <Select onChange={(e) => setItemsPerPage(Number(e.target.value))} value={itemsPerPage} width="auto">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </Select>
      </Flex>
    </Stack>
  );
};

export default MarketNewsFeed;
