import React from 'react';
import { Box, Link, Image, Text,useColorModeValue, Button } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Tag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
  TagCloseButton,
} from '@chakra-ui/react'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
const NewsCard = ({ news }) => {
  const bgColor = useColorModeValue('gray.50', 'gray.800');  // Ensuring color mode adaptiveness
  const summaryLength = 200;  // Maximum number of characters in the summary preview

  const truncatedSummary = news.summary.length > summaryLength ?
                           `${news.summary.slice(0, summaryLength)}...` :
                           news.summary;

  return (
    <Box   borderRadius="lg" boxShadow="lg" borderWidth="1px"  overflow="hidden" p={4} bg={bgColor}>
       <Box textAlign="right"> <Tag  size='lg' colorScheme='blue' borderRadius='full'>
  <Avatar
    src={news.imageUrl || 'default_image_url'}
    size='xs'
    name={news.source}
    ml={-1}
    mr={2}
  />
  <TagLabel>{news.source}</TagLabel>
</Tag>
</Box>
     
      <Link href={news.url} isExternal>
        <Image
          width={100}
          height={100}
          objectFit="cover"
          borderRadius="md"
          src={news.imageUrl || 'default_image_url'}
          alt={news.title}
        />
      </Link>
      <Text mt={2} fontWeight="bold" fontSize="lg">{news.title}</Text>
      <Text mt={2}>{truncatedSummary}</Text>
      {news.summary.length > summaryLength && (
         <Box textAlign="right">
        <Link href={news.url} isExternal>
        <Button rightIcon={<ArrowForwardIcon />} colorScheme="blue" mt={2}>
          Read More
        </Button>
      </Link>
      </Box>
      )}
    </Box>
  );
};

export default NewsCard;
