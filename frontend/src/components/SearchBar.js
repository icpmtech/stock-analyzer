// SearchBar.js
import React from 'react';
import { Input, Flex, IconButton } from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";

const SearchBar = ({ value, onChange, onSearch }) => {
    return (
        <Flex as="form" onSubmit={(e) => {
            e.preventDefault();
            onSearch(value);
        }}>
            <Input
               placeholder="Enter dataset code (e.g., WIKI/AAPL)"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                size="lg"
                mr={2}
            />
            <IconButton
                icon={<MdSearch />}
                type="submit"
                aria-label="Search stocks"
                colorScheme="blue"
            />
        </Flex>
    );
};

export default SearchBar;
