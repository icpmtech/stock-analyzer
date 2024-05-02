
import React, { useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  useDisclosure,
  Collapse,
  Input,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Divider
} from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon, EditIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react';
const PortfolioHoldings = ({ holdings }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editedHolding, setEditedHolding] = useState({});
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const { isOpen, onToggle } = useDisclosure();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleEdit = (index, holding) => {
    setEditIndex(index);
    setEditedHolding({ ...holding });
  };

  const handleSaveEdit = (index) => {
    // Get existing holdings from local storage
    const existingHoldings = JSON.parse(localStorage.getItem('holdingsData')) || [];
  
    // Update the holding at the specified index with the edited holding
    existingHoldings[index] = editedHolding;
  
    // Update local storage with the updated holdings array
    localStorage.setItem('holdingsData', JSON.stringify(existingHoldings));
  
    // Clear the edit index
    setEditIndex(null);
  };
  

  const handleCancelEdit = () => {
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    // Perform delete operation here
    setIsDeleteDialogOpen(false);
    setDeleteIndex(null);
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setDeleteIndex(null);
  };

  const handleCreate = () => {
    setIsCreateMode(true);
  };

  const handleSaveCreate = () => {
    // Get existing holdings from local storage or initialize an empty array if no data exists
    const existingHoldings = JSON.parse(localStorage.getItem('holdingsData')) || [];
  
    // Add the new holding to the existing holdings array
    const updatedHoldings = [...existingHoldings, editedHolding];
  
    // Update local storage with the updated holdings array
    localStorage.setItem('holdingsData', JSON.stringify(updatedHoldings));
  
    // Exit create mode
    setIsCreateMode(false);
  };
  

  const handleCancelCreate = () => {
    setIsCreateMode(false);
  };
  return (
   
    <>
    {!isCreateMode && (
      <Button onClick={handleCreate} mt={4} leftIcon={<AddIcon />} colorScheme="blue">
        Add Holding
      </Button>
    )}
    {isCreateMode && (
      <Box mt={4}>
        <Input placeholder="Symbol" value={editedHolding.symbol} onChange={(e) => setEditedHolding({ ...editedHolding, symbol: e.target.value })} />
        <Input placeholder="Status" value={editedHolding.status} onChange={(e) => setEditedHolding({ ...editedHolding, status: e.target.value })} mt={2} />
        <Button onClick={handleSaveCreate} mt={2} colorScheme="teal">Save</Button>
        <Button onClick={handleCancelCreate} mt={2} ml={2} colorScheme="gray">Cancel</Button>
      </Box>
    )}
    <Divider padding='2' />
    <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md">
      <TableContainer>
        <Table size='sm' variant="simple">
          <Thead>
            <Tr>
              <Th>Symbol</Th>
              <Th>Status</Th>
              <Th isNumeric>Shares</Th>
              <Th isNumeric>Last Price</Th>
              <Th isNumeric>Avg Cost / Share</Th>
              <Th isNumeric>Total Cost</Th>
              <Th isNumeric>Market Value</Th>
              <Th isNumeric>Total Dividend Income</Th>
              <Th isNumeric>Today's Gain (Unrealized)</Th>
              <Th isNumeric>Total Gain (Unrealized)</Th>
              <Th isNumeric>Total Return</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {holdings.map((holding, index) => (
              <React.Fragment key={index}>
                <Tr>
                  <Td>{editIndex === index || isCreateMode ? <Input value={editedHolding.symbol} onChange={(e) => setEditedHolding({ ...editedHolding, symbol: e.target.value })} /> : holding.symbol}</Td>
                  <Td>{editIndex === index || isCreateMode ? <Input value={editedHolding.status} onChange={(e) => setEditedHolding({ ...editedHolding, status: e.target.value })} /> : holding.status}</Td>
                  <Td isNumeric>{editIndex === index || isCreateMode ? <Input value={editedHolding.shares} onChange={(e) => setEditedHolding({ ...editedHolding, shares: e.target.value })} /> : holding.shares}</Td>
                  <Td isNumeric>{editIndex === index || isCreateMode ? <Input value={editedHolding.lastPrice} onChange={(e) => setEditedHolding({ ...editedHolding, lastPrice: e.target.value })} /> : holding.lastPrice}</Td>
                  <Td isNumeric>{editIndex === index || isCreateMode ? <Input value={editedHolding.avgCost} onChange={(e) => setEditedHolding({ ...editedHolding, avgCost: e.target.value })} /> : holding.avgCost}</Td>
                  <Td isNumeric>{editIndex === index || isCreateMode ? <Input value={editedHolding.totalCost} onChange={(e) => setEditedHolding({ ...editedHolding, totalCost: e.target.value })} /> : holding.totalCost}</Td>
                  <Td isNumeric>{editIndex === index || isCreateMode ? <Input value={editedHolding.marketValue} onChange={(e) => setEditedHolding({ ...editedHolding, marketValue: e.target.value })} /> : holding.marketValue}</Td>
                  <Td isNumeric>{editIndex === index || isCreateMode ? <Input value={editedHolding.totalDividendIncome} onChange={(e) => setEditedHolding({ ...editedHolding, totalDividendIncome: e.target.value })} /> : holding.totalDividendIncome}</Td>
                  <Td isNumeric>{editIndex === index || isCreateMode ? <Input value={editedHolding.todaysGain} onChange={(e) => setEditedHolding({ ...editedHolding, todaysGain: e.target.value })} /> : holding.todaysGain}</Td>
                  <Td isNumeric>{editIndex === index || isCreateMode ? <Input value={editedHolding.totalGain} onChange={(e) => setEditedHolding({ ...editedHolding, totalGain: e.target.value })} /> : holding.totalGain}</Td>
                  <Td isNumeric>{editIndex === index || isCreateMode ? <Input value={editedHolding.totalReturn} onChange={(e) => setEditedHolding({ ...editedHolding, totalReturn: e.target.value })} /> : holding.totalReturn}</Td>
                  <Td>
                    {editIndex === index ? (
                      <>
                        <Button colorScheme="teal" size="sm" onClick={() => handleSaveEdit(index)}>Save</Button>
                        <Button colorScheme="gray" size="sm" onClick={handleCancelEdit}>Cancel</Button>
                      </>
                    ) : (
                      <>
                        <IconButton
                          aria-label="Edit"
                          icon={<EditIcon />}
                          onClick={() => handleEdit(index, holding)}
                          size="sm" />
                        <IconButton
                          aria-label="Delete"
                          icon={<DeleteIcon />}
                          onClick={() => handleDelete(index)}
                          size="sm" />
                      </>
                    )}
                  </Td>
                </Tr>
                <Tr>
                  <Td colSpan="12">
                    <Collapse in={deleteIndex === index}>
                      <Box p={4} mt={2} shadow="md" borderWidth="1px">
                        <AlertDialog isOpen={isDeleteDialogOpen} onClose={handleCancelDelete}>
                          <AlertDialogOverlay>
                            <AlertDialogContent>
                              <AlertDialogHeader>Delete Holding</AlertDialogHeader>
                              <AlertDialogBody>
                                Are you sure you want to delete this holding?
                              </AlertDialogBody>
                              <AlertDialogFooter>
                                <Button colorScheme="red" onClick={handleConfirmDelete}>
                                  Delete
                                </Button>
                                <Button onClick={handleCancelDelete} ml={3}>
                                  Cancel
                                </Button>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialogOverlay>
                        </AlertDialog>
                      </Box>
                    </Collapse>
                  </Td>
                </Tr>
              </React.Fragment>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box></>
  );
};

export default PortfolioHoldings;
