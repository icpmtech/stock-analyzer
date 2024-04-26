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

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    // Add your registration logic here
    console.log("User Registered", formData);
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <Box title='Login' p={4} maxWidth="500px" borderWidth="1px" borderRadius="lg" boxShadow="lg" m="20px auto">
      <form onSubmit={handleSubmit}>
        <FormControl isRequired mt={6}>
          <FormLabel htmlFor='username'>Username</FormLabel>
          <Input id='username' name='username' type='text' onChange={handleInputChange} />
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel htmlFor='email'>Email</FormLabel>
          <Input id='email' name='email' type='email' onChange={handleInputChange} />
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel htmlFor='password'>Password</FormLabel>
          <InputGroup>
            <Input
              id='password'
              name='password'
              type={showPassword ? 'text' : 'password'}
              onChange={handleInputChange}
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={togglePasswordVisibility}>
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel htmlFor='confirmPassword'>Confirm Password</FormLabel>
          <InputGroup>
            <Input
              id='confirmPassword'
              name='confirmPassword'
              type={showConfirmPassword ? 'text' : 'password'}
              onChange={handleInputChange}
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={toggleConfirmPasswordVisibility}>
                {showConfirmPassword ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button colorScheme='blue' width="full" mt={4} type='submit'>
          Register
        </Button>
      </form>
    </Box>
  );
};

export default RegisterForm;
