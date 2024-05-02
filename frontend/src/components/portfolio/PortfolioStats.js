import { Box, Stat, StatLabel, StatNumber, StatGroup, StatHelpText } from "@chakra-ui/react";

const PortfolioStats = ({ cashHoldings, dayGain, totalGain, annualPerformance }) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md">
      <StatGroup>
        <Stat>
          <StatLabel>Cash Holdings</StatLabel>
          <StatNumber>€{cashHoldings.toLocaleString()}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Day Gain</StatLabel>
          <StatNumber>{dayGain.value} ({dayGain.percentage}%)</StatNumber>
          <StatHelpText>Today's Gain</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Total Gain</StatLabel>
          <StatNumber>{totalGain.value} ({totalGain.percentage}%)</StatNumber>
          <StatHelpText>Cumulative</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Annual Performance</StatLabel>
          <StatNumber>{annualPerformance}</StatNumber>
        </Stat>
      </StatGroup>
    </Box>
  );
};
export default PortfolioStats;