import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    username: '',
    password: ''
  });
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your login logic here
    toast({
      title: "Login Attempt",
      description: `Username: ${loginDetails.username}`,
      status: "info",
      duration: 5000,
      isClosable: true,
    });
    console.log(loginDetails);
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Box title='Login' p={4} maxWidth="500px" borderWidth="1px" borderRadius="lg" boxShadow="lg" m="20px auto">
      <form onSubmit={handleSubmit}>
        <FormControl isRequired mt={6}>
          <FormLabel htmlFor='username'>Username</FormLabel>
          <Input id='username' name='username' type='text' placeholder='Enter your username' onChange={handleInputChange} />
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel htmlFor='password'>Password</FormLabel>
          <InputGroup>
            <Input
              id='password'
              name='password'
              type={showPassword ? 'text' : 'password'}
              placeholder='Enter your password'
              onChange={handleInputChange}
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={togglePasswordVisibility}>
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button colorScheme='blue' width="full" mt={4} type='submit'>
          Login
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
