import React from 'react';
import {
  Flex,
  Text,
  Link as ChakraLink,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Image
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { HamburgerIcon } from '@chakra-ui/icons';
import NotificationHeader from './notifications/NotificationHeader';

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>   <Flex
    
    as="nav"
    px={4}
    py={2}
    justifyContent="space-between"
    alignItems="center"
    boxShadow="sm"
    bg="white"
    position="sticky"
    top={0}
    zIndex={1} // Ensure it stays on top of other content
    width="100%" // Ensures it stretches across the full width of the viewport
  >
      {/* Adjusted image and text layout */}
      <Flex alignItems="center">
        <Image src='../logo192.png' alt="Logo" boxSize="50px" marginRight="12px" />
      </Flex>
      <IconButton
        ref={btnRef}
        icon={<HamburgerIcon />}
        display={{ sm: 'inline-flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="Open Menu"
        size="lg" />
      <Flex display={{ base: 'none', md: 'flex' }} alignItems="center">
        <ChakraLink as={Link} to="/" px={2}>Home</ChakraLink>
        <ChakraLink as={Link} to="/stock-chart" px={2}>Stock Chart</ChakraLink>
        <ChakraLink as={Link} to="/holdings" px={2}>My Holdings</ChakraLink>
        <ChakraLink as={Link} to="/login" px={2}>Login</ChakraLink>
        <ChakraLink as={Link} to="/register" px={2}>Register</ChakraLink>
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Navigation</DrawerHeader>
          <DrawerBody>
            <Flex flexDirection="column" as="nav">
              <ChakraLink as={Link} to="/" p={2} onClick={onClose}>Home</ChakraLink>
              <ChakraLink as={Link} to="/stock-chart" p={2} onClick={onClose}>Stock Chart</ChakraLink>
              <ChakraLink as={Link} to="/holdings" p={2} onClick={onClose}>My Holdings</ChakraLink>
              <ChakraLink as={Link} to="/login" p={2} onClick={onClose}>Login</ChakraLink>
              <ChakraLink as={Link} to="/register" p={2} onClick={onClose}>Register</ChakraLink>
              
            </Flex>
          
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    
    </Flex>
    <Flex as="header"  
      px={4}
      py={2}
      justifyContent="space-between"
      alignItems="center"
      boxShadow="sm"
      bg="black"
      
      top={0}
     
      viewportboxShadow="md">
      <Text fontSize="lg" fontWeight="bold" color="white">Stock Analizer</Text>
      <NotificationHeader />
    </Flex></>
  );
}

export default Header;
