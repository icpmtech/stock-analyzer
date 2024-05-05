import React from 'react';
import { Input, Flex, IconButton, InputGroup, InputRightElement } from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";

const SearchBar = ({ value, onChange, onSearch, loading }) => {
    return (
        <Flex as="form" onSubmit={(e) => {
            e.preventDefault();
            onSearch(value);
        }}>
            <InputGroup size="lg">
                <Input
                    placeholder="Enter symbol ticker code (e.g., AAPL)"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    pr="4.5rem" // padding right to ensure text doesn't hide behind the button
                />
                <InputRightElement width="4.5rem">
                    <IconButton
                        isLoading={loading}
                        icon={<MdSearch />}
                        type="submit"
                        aria-label="Search stocks"
                        colorScheme="blue"
                    />
                </InputRightElement>
            </InputGroup>
        </Flex>
    );
};

export default SearchBar;
