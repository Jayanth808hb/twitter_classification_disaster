import React from 'react';
import { FormLabel, Input, Text } from '@chakra-ui/react'
import { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react';
import { FormControl } from '@chakra-ui/react';

const url = process.env.url

function App() {
  const [value, setValue] = React.useState('');
  const handleChange = (event) => setValue(event.target.value);
  const toast = useToast()
  const handleSubmit = async () => {
    try{
      let response=await fetch("http://127.0.0.1:5000/predict",{
          method:"POST",
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify({text: value})
      }).then(async (res) => {
        let response = await res.json()
        console.log(response)
    })
    }
    catch(error){
        console.log(error)
    }
  }

  function validateName(value) {
    if (!value) {
      toast({
        title: 'Field Empty!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return (
    <ChakraProvider>
      <FormControl>
          <FormLabel>Tweet</FormLabel>
          <Input  value={value}
        onChange={handleChange}
        placeholder='Here is a sample placeholder'
        size='sm' />
          <Button
            mt={4}
            colorScheme='teal'
            type='submit'
            onClick = {handleSubmit}
          >
            Submit
          </Button>
        </FormControl>
    </ChakraProvider>
  );
}

export default App;
