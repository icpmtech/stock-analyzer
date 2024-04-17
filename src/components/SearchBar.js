// SearchBar.js
import { Input, Flex, Icon } from "@chakra-ui/react";
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
      <Icon as={MdSearch} w={6} h={6} />
    </Flex>
  );
};

export default SearchBar;
