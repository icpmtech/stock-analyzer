// src/components/FinanceWidget.js
import { Box, Heading, List, ListItem } from "@chakra-ui/react";

function FinanceWidget() {
  const stocks = [
    { name: "AAPL", price: "$175.96" },
    { name: "GOOGL", price: "$122.37" },
    { name: "AMZN", price: "$111.25" }
  ];

  return (
    <Box p={4} bg="gray.200">
      <Heading as="h3" size="lg" mb={4}>Market Summary</Heading>
      <List spacing={3}>
        {stocks.map(stock => (
          <ListItem key={stock.name} fontWeight="bold">
            {stock.name}: {stock.price}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default FinanceWidget;
