// MarketNewsCard.js
import { Box, Text,Link, Image, useColorModeValue } from "@chakra-ui/react";

const MarketNewsCard = ({ news }) => {
  const bgColor = useColorModeValue('white', 'gray.700');
  
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} bg={bgColor}>
        <Link href={news.url} isExternal>
        <Image
          width={200}
          height={200} // Set a fixed height for uniformity
          objectFit="cover" // Ensure the image covers the area without distorting aspect ratio
          borderRadius="md"
          src={news.imageUrl || 'default_image_url'} // Fallback to default image if none
          alt={news.title}
        />
           </Link>
      
      <Text mt={2} fontWeight="bold" fontSize="lg">{news.title}</Text>
      <Text mt={2}>{news.summary}</Text>
    </Box>
  );
};

export default MarketNewsCard;
