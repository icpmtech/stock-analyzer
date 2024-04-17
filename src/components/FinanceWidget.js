// src/components/FinanceWidget.js
import { Box, Heading, List, ListItem, Divider, Text } from "@chakra-ui/react";

function FinanceWidget() {
    const stocks = [
        { name: "AAPL", price: "$175.96" },
        { name: "GOOGL", price: "$122.37" },
        { name: "AMZN", price: "$111.25" }
    ];

    const news = [
        { headline: "Tech stocks rally as market rebounds", source: "Reuters" },
        { headline: "Consumer spending boosts market confidence", source: "Bloomberg" },
        { headline: "Market volatility continues amid trade talks", source: "CNBC" }
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
            <Divider my={4} />
            <Heading as="h3" size="lg" mb={4}>Market News</Heading>
            {news.map((item, index) => (
                <Text key={index} fontSize="md" mt={2}><strong>{item.headline}</strong> - {item.source}</Text>
            ))}
        </Box>
    );
}

export default FinanceWidget;
