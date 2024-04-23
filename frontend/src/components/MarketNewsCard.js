import React from 'react';
import { Box, Link, Image, Text,useColorModeValue } from '@chakra-ui/react';

const NewsCard = ({ news }) => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');  // Ensuring color mode adaptiveness
  const summaryLength = 200;  // Maximum number of characters in the summary preview

  const truncatedSummary = news.summary.length > summaryLength ?
                           `${news.summary.slice(0, summaryLength)}...` :
                           news.summary;

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} bg={bgColor}>
      <Link href={news.url} isExternal>
        <Image
          width={200}
          height={200}
          objectFit="cover"
          borderRadius="md"
          src={news.imageUrl || 'default_image_url'}
          alt={news.title}
        />
      </Link>
      <Text mt={2} fontWeight="bold" fontSize="lg">{news.title}</Text>
      <Text mt={2}>{truncatedSummary}</Text>
      {news.summary.length > summaryLength && (
        <Link href={news.url} isExternal color="blue.500" mt={2}>
          Read More
        </Link>
      )}
    </Box>
  );
};

export default NewsCard;
