// MarketNewsCard.js
import { Box, Text, Image, useColorModeValue } from "@chakra-ui/react";

const MarketNewsCard = ({ news }) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} bg={bgColor}>
      <Image borderRadius="md" src={news.imageUrl} alt={news.title} />
      <Text mt={2} fontWeight="bold" fontSize="lg">{news.title}</Text>
      <Text mt={2}>{news.summary}</Text>
    </Box>
  );
};

export default MarketNewsCard;
