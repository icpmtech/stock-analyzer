import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, Table, Thead, Tbody, Tr, Th, Td, TableContainer, IconButton, Button, Input,
  Alert, AlertIcon, AlertTitle, AlertDescription,
  AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader,
  AlertDialogBody, AlertDialogFooter, Divider
} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons';

const PortfolioHoldings = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [holdings, setHoldings] = useState([]);
  const [editedHolding, setEditedHolding] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [error, setError] = useState('');
  const [isCreateMode, setIsCreateMode] = useState(false);

  useEffect(() => {
    fetchHoldings();
  }, []);

  const fetchHoldings = async () => {
    try {
      const response = await axios.get('http://localhost:3001/portfolioHoldings');
      setHoldings(response.data);
    } catch (error) {
      console.error('Failed to fetch holdings:', error);
      setError('Failed to fetch holdings');
    }
  };

  const handleEdit = (holding) => {
    setEditedHolding({ ...holding });
    setDialogType('edit');
    setIsDialogOpen(true);
  };

  const handleDelete = (id) => {
    setEditedHolding({ _id: id });
    setDialogType('delete');
    setIsDialogOpen(true);
  };

  const saveChanges = async () => {
    const method = editedHolding._id ? 'put' : 'post';
    const url = `http://localhost:3001/portfolioHoldings/${editedHolding._id || ''}`;
    try {
      await axios[method](url, editedHolding);
      fetchHoldings();
      setIsDialogOpen(false);
      setEditedHolding({});
    } catch (error) {
      console.error('API request failed:', error);
      setError('Failed to save changes');
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/portfolioHoldings/${editedHolding._id}`);
      fetchHoldings();
      setIsDialogOpen(false);
      setEditedHolding({});
    } catch (error) {
      console.error('API request failed:', error);
      setError('Failed to delete holding');
    }
  };

  const handleCreate = () => {
    setIsCreateMode(true);
    setEditedHolding({
      symbol: '',
      status: '',
      shares: 0,
      lastPrice: 0,
      avgCost: 0,
      totalCost: 0,
      marketValue: 0,
      totalDividendIncome: '--',
      todaysGain: '',
      totalGain: '',
      totalReturn: '--',
      marketValueTrend: []
    });
  };

  const handleInputChange = (e) => {
    setEditedHolding({ ...editedHolding, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setEditedHolding({});
    setError('');
  };
  const handleSaveCreate = async () => {
    try {
      await axios.post('http://localhost:3001/portfolioHoldings', editedHolding);
      fetchHoldings();
      setIsCreateMode(false);
      setEditedHolding({});
      handleCloseCreateModal();
    } catch (error) {
      console.error('API request failed:', error);
      setError('Failed to save new holding');
    }
  };

  const handleCancelCreate = () => {
    setIsCreateMode(false);
    setEditedHolding({});
  };
  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

 
  return (
    <>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <Box flex="1">
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Box>
          <Button onClick={() => setError('')}>Close</Button>
        </Alert>
      )}
      {!isCreateMode && (
        <Button onClick={handleOpenCreateModal} mt={4} leftIcon={<AddIcon />} colorScheme="blue">
          Add Holding
        </Button>
      )}
      
         <Modal isOpen={isCreateModalOpen} onClose={handleCloseCreateModal}>
         <ModalOverlay />
         <ModalContent>
           <ModalHeader>Create New Holding</ModalHeader>
           <ModalCloseButton />
           <ModalBody>
            <Box mt={4}>
            <Input
              placeholder="Symbol"
              value={editedHolding.symbol}
              onChange={(e) => setEditedHolding({ ...editedHolding, symbol: e.target.value })}
            />
            <Input
              placeholder="Status"
              value={editedHolding.status}
              onChange={(e) => setEditedHolding({ ...editedHolding, status: e.target.value })}
              mt={2}
            />
            <Input
              placeholder="Shares"
              value={editedHolding.shares}
              onChange={(e) => setEditedHolding({ ...editedHolding, shares: Number(e.target.value) })}
              mt={2}
            />
            <Input
              placeholder="Last Price"
              value={editedHolding.lastPrice}
              onChange={(e) => setEditedHolding({ ...editedHolding, lastPrice: Number(e.target.value) })}
              mt={2}
            />
            <Input
              placeholder="Average Cost"
              value={editedHolding.avgCost}
              onChange={(e) => setEditedHolding({ ...editedHolding, avgCost: Number(e.target.value) })}
              mt={2}
            />
            <Input
              placeholder="Market Value"
              value={editedHolding.marketValue}
              onChange={(e) => setEditedHolding({ ...editedHolding, marketValue: Number(e.target.value) })}
              mt={2}
            />
            <Input
              placeholder="Total Cost"
              value={editedHolding.totalCost}
              onChange={(e) => setEditedHolding({ ...editedHolding, totalCost: Number(e.target.value) })}
              mt={2}
            />
            <Input
              placeholder="Total Dividend Income"
              value={editedHolding.totalDividendIncome}
              onChange={(e) => setEditedHolding({ ...editedHolding, totalDividendIncome: e.target.value })}
              mt={2}
            />
            <Input
              placeholder="Today's Gain"
              value={editedHolding.todaysGain}
              onChange={(e) => setEditedHolding({ ...editedHolding, todaysGain: e.target.value })}
              mt={2}
            />
            <Input
              placeholder="Total Gain"
              value={editedHolding.totalGain}
              onChange={(e) => setEditedHolding({ ...editedHolding, totalGain: e.target.value })}
              mt={2}
            />
            <Input
              placeholder="Total Return"
              value={editedHolding.totalReturn}
              onChange={(e) => setEditedHolding({ ...editedHolding, totalReturn: e.target.value })}
              mt={2}
            />
          
          </Box> </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveCreate}>
              Save
            </Button>
            <Button onClick={handleCloseCreateModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    
      <Divider my="4" />
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Symbol</Th>
              <Th>Status</Th>
              <Th isNumeric>Shares</Th>
              <Th isNumeric>Last Price</Th>
              <Th isNumeric>Avg Cost</Th>
              <Th isNumeric>Total Cost</Th>
              <Th isNumeric>Market Value</Th>
              <Th isNumeric>Total Dividend Income</Th>
              <Th isNumeric>Today's Gain</Th>
              <Th isNumeric>Total Gain</Th>
              <Th isNumeric>Total Return</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {holdings.map((holding, index) => (
              <Tr key={holding._id}>
                <Td>{holding.symbol}</Td>
                <Td>{holding.status}</Td>
                <Td isNumeric>{holding.shares}</Td>
                <Td isNumeric>{holding.lastPrice}</Td>
                <Td isNumeric>{holding.avgCost}</Td>
                <Td isNumeric>{holding.totalCost}</Td>
                <Td isNumeric>{holding.marketValue}</Td>
                <Td isNumeric>{holding.totalDividendIncome}</Td>
                <Td isNumeric>{holding.todaysGain}</Td>
                <Td isNumeric>{holding.totalGain}</Td>
                <Td isNumeric>{holding.totalReturn}</Td>
                <Td>
                  <IconButton icon={<EditIcon />} onClick={() => handleEdit(holding)} m="1" />
                  <IconButton icon={<DeleteIcon />} onClick={() => handleDelete(holding._id)} m="1" />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <AlertDialog isOpen={isDialogOpen} leastDestructiveRef={undefined} onClose={handleClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>
              {dialogType === 'delete' ? 'Delete Holding' : 'Edit Holding'}
            </AlertDialogHeader>
            <AlertDialogBody>
              {dialogType === 'delete' ? 
                'Are you sure? You can\'t undo this action afterwards.' : 
                (
                  <Box mt={4}>
                  <Input
                    placeholder="Symbol"
                    value={editedHolding.symbol}
                    onChange={(e) => setEditedHolding({ ...editedHolding, symbol: e.target.value })}
                  />
                  <Input
                    placeholder="Status"
                    value={editedHolding.status}
                    onChange={(e) => setEditedHolding({ ...editedHolding, status: e.target.value })}
                    mt={2}
                  />
                  <Input
                    placeholder="Shares"
                    value={editedHolding.shares}
                    onChange={(e) => setEditedHolding({ ...editedHolding, shares: Number(e.target.value) })}
                    mt={2}
                  />
                  <Input
                    placeholder="Last Price"
                    value={editedHolding.lastPrice}
                    onChange={(e) => setEditedHolding({ ...editedHolding, lastPrice: Number(e.target.value) })}
                    mt={2}
                  />
                  <Input
                    placeholder="Average Cost"
                    value={editedHolding.avgCost}
                    onChange={(e) => setEditedHolding({ ...editedHolding, avgCost: Number(e.target.value) })}
                    mt={2}
                  />
                  <Input
                    placeholder="Market Value"
                    value={editedHolding.marketValue}
                    onChange={(e) => setEditedHolding({ ...editedHolding, marketValue: Number(e.target.value) })}
                    mt={2}
                  />
                  <Input
                    placeholder="Total Cost"
                    value={editedHolding.totalCost}
                    onChange={(e) => setEditedHolding({ ...editedHolding, totalCost: Number(e.target.value) })}
                    mt={2}
                  />
                  <Input
                    placeholder="Total Dividend Income"
                    value={editedHolding.totalDividendIncome}
                    onChange={(e) => setEditedHolding({ ...editedHolding, totalDividendIncome: e.target.value })}
                    mt={2}
                  />
                  <Input
                    placeholder="Today's Gain"
                    value={editedHolding.todaysGain}
                    onChange={(e) => setEditedHolding({ ...editedHolding, todaysGain: e.target.value })}
                    mt={2}
                  />
                  <Input
                    placeholder="Total Gain"
                    value={editedHolding.totalGain}
                    onChange={(e) => setEditedHolding({ ...editedHolding, totalGain: e.target.value })}
                    mt={2}
                  />
                  <Input
                    placeholder="Total Return"
                    value={editedHolding.totalReturn}
                    onChange={(e) => setEditedHolding({ ...editedHolding, totalReturn: e.target.value })}
                    mt={2}
                  />
                  </Box>
                )
              }
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={undefined} onClick={handleClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={dialogType === 'delete' ? confirmDelete : saveChanges} ml={3}>
                {dialogType === 'delete' ? 'Delete' : 'Save'}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default PortfolioHoldings;
