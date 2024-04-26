import React from 'react';
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
  Collapse
} from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';

const StockHoldings = ({ holdings }) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: false });

  return (
    <Box p={4}>
      <TableContainer>
        <Table variant="simple">
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
              <Th>Expand / Collapse</Th>
            </Tr>
          </Thead>
          <Tbody>
            {holdings.map((holding, index) => (
              <React.Fragment key={index}>
                <Tr>
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
                    <IconButton
                      aria-label="Expand details"
                      icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                      onClick={onToggle}
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Td colSpan="12">
                    <Collapse in={isOpen}>
                      <Box p={4} mt={2} shadow="md" borderWidth="1px">
                        Detailed information could go here...
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

export default StockHoldings;
