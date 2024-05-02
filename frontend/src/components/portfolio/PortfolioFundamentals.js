import React from 'react';
import {
  Box, Table, Thead, Tbody, Tr, Th, Td, TableContainer
} from '@chakra-ui/react';
import { Sparklines, SparklinesLine } from 'react-sparklines';

const PortfolioFundamentals = ({ holdings }) => {
  return (
    <Box p={5} overflowX="auto" shadow="md" borderWidth="1px" flex="1" borderRadius="md">
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
            </Tr>
          </Thead>
          <Tbody>
            {holdings.map((stock, index) => (
              <Tr key={index}>
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
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PortfolioFundamentals;
