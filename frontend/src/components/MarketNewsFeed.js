// MarketNewsFeed.js
import { Stack } from "@chakra-ui/react";
import MarketNewsCard from "./MarketNewsCard";

const MarketNewsFeed = ({ newsList }) => {
  return (
    <Stack spacing={4}>
      {newsList.map(news => (
        <MarketNewsCard key={news.id} news={news} />
      ))}
    </Stack>
  );
};

export default MarketNewsFeed;
