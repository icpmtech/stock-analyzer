// src/components/NewsFeed.js
import { Box, Heading, Text } from "@chakra-ui/react";

function NewsFeed() {
  return (
    <Box  borderRadius="lg" boxShadow="lg" p={4}>
      <Heading as="h3" size="lg">Latest News</Heading>
      {/* Map through news articles here */}
      <Text mt={2}>News Article #1</Text>
    </Box>
  );
}

export default NewsFeed;
