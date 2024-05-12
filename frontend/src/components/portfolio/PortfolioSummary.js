// PortfolioSummary.js
import React, { useState } from 'react';
import {
  Box, Table, Thead, Tbody, Tr, Th, Td, TableContainer, IconButton, Collapse
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import HoldingDetail from '../holdings/HoldingDetail'; // Import the component

const PortfolioSummary = ({ holdings }) => {
  const [showDetails, setShowDetails] = useState(new Array(holdings.length).fill(false));

  const toggleDetails = (index) => {
    const newShowDetails = [...showDetails];
    newShowDetails[index] = !newShowDetails[index];
    setShowDetails(newShowDetails);
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md">
      <TableContainer>
        <Table size='sm' variant="simple">
          <Thead>
            <Tr>
              <Th></Th> {/* For expand/collapse icon */}
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
              <Th>Trend</Th>
            </Tr>
          </Thead>
          <Tbody>
            {holdings.map((holding, index) => (
              <>
                <Tr key={index}>
                  <Td>
                    <IconButton
                      aria-label="Expand details"
                      icon={showDetails[index] ? <ChevronUpIcon /> : <ChevronDownIcon />}
                      onClick={() => toggleDetails(index)}
                      size="sm"
                    />
                  </Td>
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
                    <Sparklines data={holding.marketValueTrend} limit={5}>
                      <SparklinesLine color="blue" />
                    </Sparklines>
                  </Td>
                </Tr>
                <Tr>
                  <Td colSpan="13">
                    <Collapse in={showDetails[index]} animateOpacity>
                      <HoldingDetail holding={holding} /> {/* Use HoldingDetail component */}
                    </Collapse>
                  </Td>
                </Tr>
              </>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
   
    </Box>
  );
};

export default PortfolioSummary;
