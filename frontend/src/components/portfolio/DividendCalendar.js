import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {
  Box, Button, Input, Text, VStack, List, ListItem, FormControl,
  useToast, Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalBody, ModalCloseButton, FormLabel, useDisclosure,
  Divider, Table, Thead, Tbody, Tr, Th, Td, TableContainer
} from '@chakra-ui/react';

const DividendCalendar = () => {
  const [dividends, setDividends] = useState([]);
  const [symbol, setSymbol] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [dividendData, setDividendData] = useState({
    symbol: '',
    amount: '',
    date: '',
    exDivDate: ''
  });
  useEffect(() => {
    fetchDividends();
}, []); 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDividendData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const fetchDividends = async () => {
   

    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/api/dividends`);
      setDividends(response.data || []);
    } catch (error) {
      console.error('Failed to fetch dividends', error);
      setError('Failed to fetch dividends. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateDividend = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/api/dividends', dividendData);
      if (response.status === 201) {
        setDividends(prev => [...prev, response.data]);
        toast({
          title: "Dividend Added",
          description: "The new dividend has been successfully added.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
      }
    } catch (error) {
      console.error('Error creating dividend', error);
      setError('Failed to create dividend. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  const handleSymbolChange = (event) => {
    setSymbol(event.target.value);
  };
  return (
    <>
      <Button onClick={onOpen} colorScheme="teal" size="md">Add Dividend</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Dividend</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Symbol</FormLabel>
              <Input name="symbol" value={dividendData.symbol} onChange={handleInputChange} placeholder="Symbol" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Amount</FormLabel>
              <Input name="amount" value={dividendData.amount} onChange={handleInputChange} placeholder="Amount" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Date</FormLabel>
              <Input name="date" value={dividendData.date} onChange={handleInputChange} type="date" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Ex-Dividend Date</FormLabel>
              <Input name="exDivDate" value={dividendData.exDivDate} onChange={handleInputChange} type="date" />
            </FormControl>
            <FormControl>
              <FormLabel>Symbol</FormLabel>
              <Input name="symbol" value={dividendData.symbol} onChange={handleInputChange} placeholder="Symbol" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Status</FormLabel>
              <Input name="status" value={dividendData.status} onChange={handleInputChange} placeholder="Status" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Shares</FormLabel>
              <Input type="number" name="shares" value={dividendData.shares} onChange={handleInputChange} placeholder="Shares" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last Price</FormLabel>
              <Input type="number" name="lastPrice" value={dividendData.lastPrice} onChange={handleInputChange} placeholder="Last Price" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Average Cost</FormLabel>
              <Input type="number" name="avgCost" value={dividendData.avgCost} onChange={handleInputChange} placeholder="Average Cost" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Total Dividend Income</FormLabel>
              <Input name="totalDividendIncome" value={dividendData.totalDividendIncome} onChange={handleInputChange} placeholder="Total Dividend Income" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Today's Gain</FormLabel>
              <Input name="todaysGain" value={dividendData.todaysGain} onChange={handleInputChange} placeholder="Today's Gain" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Total Gain</FormLabel>
              <Input name="totalGain" value={dividendData.totalGain} onChange={handleInputChange} placeholder="Total Gain" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Total Return</FormLabel>
              <Input name="totalReturn" value={dividendData.totalReturn} onChange={handleInputChange} placeholder="Total Return" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Dividend Per Share</FormLabel>
              <Input name="divPerShare" value={dividendData.divPerShare} onChange={handleInputChange} placeholder="Dividend Per Share" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Dividend Payment Date</FormLabel>
              <Input name="divPaymentDate" value={dividendData.divPaymentDate} onChange={handleInputChange} type="date" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Ex-Dividend Date</FormLabel>
              <Input name="exDivDate" value={dividendData.exDivDate} onChange={handleInputChange} type="date" />
            </FormControl>



          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCreateDividend} isLoading={isLoading}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Symbol</Th>
              <Th>Amount</Th>
              <Th>Ex-Div Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dividends.map((dividend, index) => (
              <Tr key={index}>
                <Td>{dividend.divPaymentDate}</Td>
                <Td>{dividend.symbol}</Td>
                <Td>{dividend.amount}</Td>
                <Td>{dividend.exDivDate}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default DividendCalendar;
