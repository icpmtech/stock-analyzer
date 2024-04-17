// StockSummaryList.js
import { SimpleGrid } from "@chakra-ui/react";
import StockSummaryCard from "./StockSummaryCard";

const StockSummaryList = ({ stocks }) => {
  return (
    <SimpleGrid columns={[1, null, 2]} spacing={4}>
      {stocks.map(stock => (
        <StockSummaryCard key={stock.symbol} stock={stock} />
      ))}
    </SimpleGrid>
  );
};

export default StockSummaryList;
