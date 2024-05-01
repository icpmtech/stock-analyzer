import { List, ListItem, ListIcon } from '@chakra-ui/react';
import { MdCheckCircle } from 'react-icons/md';

function DividendList({ dividends }) { // Correctly destructure dividends from props
  return (
    <List spacing={3}>
      {dividends.map((dividend, index) => ( // Use the passed dividends directly
        <ListItem key={index}>
          <ListIcon as={MdCheckCircle} color="green.500" />
          {dividend.date}: ${dividend.amount}
        </ListItem>
      ))}
    </List>
  );
}

export default DividendList;