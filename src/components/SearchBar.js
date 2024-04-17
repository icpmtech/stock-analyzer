// SearchBar.js
import { Input, Flex, Icon, Button } from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";

const SearchBar = ({ value, onChange }) => {
  return (
    <Flex>
      <Input
        placeholder="Search for stocks..."
        value={value}
        onChange={onChange}
        size="lg"
        mr={2}
      />
     <Button><Icon as={MdSearch} w={6} h={6} /></Button> 
    </Flex>
  );
};

export default SearchBar;
