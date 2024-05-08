import React, { useState } from 'react';
import {
  Box, Button, Table, Thead, Tbody, Tr, Th, Td, TableContainer, FormControl, FormLabel, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, IconButton, useDisclosure, Collapse, Text
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Sparklines, SparklinesLine } from 'react-sparklines';

const PortfolioFundamentals = ({ holdings, setHoldings }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [transactionForm, setTransactionForm] = useState({
    symbol: '',
    amount: 0,
    price: 0,
    date: ''
  });
  const [currentHolding, setCurrentHolding] = useState(null);
  const [transactions, setTransactions] = useState([]); // State to store transactions
  const [isOpenCollapse, setIsOpenCollapse] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransactionForm(prev => ({ ...prev, [name]: value }));
  };

  const addTransaction = () => {
    // Add new transaction to the transactions list
    const newTransaction = {
      symbol: transactionForm.symbol,
      amount: transactionForm.amount,
      price: transactionForm.price,
      date: transactionForm.date
    };
    setTransactions([...transactions, newTransaction]);
    onClose(); // Close the modal after adding the transaction
  };

  const handleDeleteTransaction = (index) => {
    // Remove transaction from transactions list
    setTransactions(transactions.filter((_, i) => i !== index));
  };

  const handleDeleteHolding = (symbol) => {
    // Remove holding and associated transactions
    setHoldings(holdings.filter(h => h.symbol !== symbol));
    setTransactions(transactions.filter(t => t.symbol !== symbol));
  };

  const handleEdit = (holding) => {
    setCurrentHolding(holding);
    onOpen();
  };

  const saveChanges = () => {
    setHoldings(holdings.map(h => h.symbol === currentHolding.symbol ? currentHolding : h));
    onClose();
  };

  return (
    <Box p={5} overflowX="auto" shadow="md" borderWidth="1px" flex="1" borderRadius="md">
      <Button onClick={onOpen} colorScheme="teal" mb={4}>Add Transaction</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a New Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Symbol</FormLabel>
              <Input name="symbol" value={transactionForm.symbol} onChange={handleInputChange} placeholder="Stock Symbol" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Number of Shares</FormLabel>
              <Input type="number" name="amount" value={transactionForm.amount} onChange={handleInputChange} placeholder="Number of Shares" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input type="number" name="price" value={transactionForm.price} onChange={handleInputChange} placeholder="Transaction Price" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Date</FormLabel>
              <Input type="date" name="date" value={transactionForm.date} onChange={handleInputChange} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={addTransaction}>
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
              <Th>Symbol</Th>
              <Th>Last Price</Th>
              <Th>Market Cap</Th>
              <Th>Avg Vol (3m)</Th>
              <Th>EPS Est Next Year</Th>
              <Th>Forward P/E</Th>
              <Th>Div Payment Date</Th>
              <Th>Ex-Div Date</Th>
              <Th>Div/Share</Th>
              <Th>Forward Annual Div Rate</Th>
              <Th>Forward Annual Div Yield</Th>
              <Th>Trailing Annual Div Rate</Th>
              <Th>Trailing Annual Div Yield</Th>
              <Th>Price/Book</Th>
              <Th>Trend</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {holdings.map((stock, index) => (
              <React.Fragment key={index}>
                <Tr onClick={() => setIsOpenCollapse(!isOpenCollapse)}>
                  <Td>{stock.symbol}</Td>
                  <Td>{stock.lastPrice}</Td>
                  <Td>{stock.marketCap}</Td>
                  <Td>{stock.avgVol}</Td>
                  <Td>{stock.epsNextYear}</Td>
                  <Td>{stock.forwardPE}</Td>
                  <Td>{stock.divPaymentDate}</Td>
                  <Td>{stock.exDivDate}</Td>
                  <Td>{stock.divPerShare}</Td>
                  <Td>{stock.forwardAnnualDivRate}</Td>
                  <Td>{stock.forwardAnnualDivYield}</Td>
                  <Td>{stock.trailingAnnualDivRate}</Td>
                  <Td>{stock.trailingAnnualDivYield}</Td>
                  <Td>{stock.priceBook}</Td>
                  <Td>
                    <Sparklines data={stock.trendData} limit={5}>
                      <SparklinesLine color="blue" />
                    </Sparklines>
                  </Td>
                  <Td>
                    <IconButton icon={isOpenCollapse ? <ChevronUpIcon /> : <ChevronDownIcon />} colorScheme="blue" aria-label="Toggle" />
                    <IconButton icon={<EditIcon />} onClick={() => handleEdit(stock)} colorScheme="blue" aria-label="Edit" />
                    <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteHolding(stock.symbol)} colorScheme="red" aria-label="Delete" ml={2} />
                  </Td>
                </Tr>
                <Tr>
                  <Td colSpan={16}>
                    <Collapse in={isOpenCollapse} animateOpacity>
                      <Box p="4">
                        <Table variant="simple">
                          <Thead>
                            <Tr>
                              <Th>Date</Th>
                              <Th>Amount</Th>
                              <Th>Price</Th>
                              <Th>Actions</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {transactions.map((transaction, idx) => (
                              transaction.symbol === stock.symbol && (
                                <Tr key={idx}>
                                  <Td>{transaction.date}</Td>
                                  <Td>{transaction.amount}</Td>
                                  <Td>{transaction.price}</Td>
                                  <Td>
                                    <IconButton
                                      icon={<DeleteIcon />}
                                      onClick={() => handleDeleteTransaction(idx)}
                                      colorScheme="red"
                                      aria-label="Delete"
                                      size="sm"
                                    />
                                  </Td>
                                </Tr>
                              )
                            ))}
                          </Tbody>
                        </Table>
                      </Box>
                    </Collapse>
                  </Td>
                </Tr>
              </React.Fragment>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PortfolioFundamentals;
