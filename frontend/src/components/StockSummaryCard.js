// StockSummaryCard.js
import { Box, Text, useColorModeValue } from "@chakra-ui/react";

const StockSummaryCard = ({ stock }) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      bg={bgColor}
      borderColor={borderColor}
    >
      <Text fontWeight="bold">{stock.name}</Text>
      <Text>{stock.price}</Text>
      <Text color={stock.change >= 0 ? "green.400" : "red.400"}>
        {stock.change}
      </Text>
    </Box>
  );
};

export default StockSummaryCard;
