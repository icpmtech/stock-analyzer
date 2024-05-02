import { Box, Stat, StatLabel, StatNumber, StatGroup, StatHelpText } from "@chakra-ui/react";
import { Sparklines, SparklinesLine } from 'react-sparklines';

const PortfolioStats = ({ cashHoldings, dayGain, totalGain, annualPerformance, gainData }) => {
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
          <Sparklines data={gainData.dayGainTrend} limit={5}>
            <SparklinesLine color="teal" />
          </Sparklines>
        </Stat>
        <Stat>
          <StatLabel>Total Gain</StatLabel>
          <StatNumber>{totalGain.value} ({totalGain.percentage}%)</StatNumber>
          <StatHelpText>Cumulative</StatHelpText>
          <Sparklines data={gainData.totalGainTrend} limit={5}>
            <SparklinesLine color="orange" />
          </Sparklines>
        </Stat>
        <Stat>
          <StatLabel>Annual Performance</StatLabel>
          <StatNumber>{annualPerformance}</StatNumber>
          <Sparklines data={gainData.annualPerformanceTrend} limit={5}>
            <SparklinesLine color="green" />
          </Sparklines>
        </Stat>
      </StatGroup>
    </Box>
  );
};

export default PortfolioStats;
