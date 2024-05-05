import React, { useState } from 'react';
import { Box, IconButton, useDisclosure, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, List, ListItem } from '@chakra-ui/react';
import { BellIcon } from '@chakra-ui/icons';

const NotificationHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [notifications, setNotifications] = useState([
    "New user signed up",
    "System downtime scheduled for 12 AM",
    "New version available. Click to update."
  ]);

  const handleBellClick = () => {
    onOpen(); // Open the drawer
  };

  return (
    <Box bg="black"  color="white">
      <IconButton
        icon={<BellIcon />}
        onClick={handleBellClick}
        variant="outline"
        aria-label="Notifications"
        isRound
        color="white"
      />
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Notifications</DrawerHeader>
          <DrawerBody>
            <List spacing={3}>
              {notifications.map((notification, index) => (
                <ListItem key={index}>{notification}</ListItem>
              ))}
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default NotificationHeader;
