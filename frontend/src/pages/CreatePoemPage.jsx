import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    useColorModeValue
  } from '@chakra-ui/react';
  
  const CreatePoem = () => {
    return (
      <Box p={10} align={"center"}>
        <FormControl>
          <Input 
            type="text" 
            placeholder="Enter Poem Title" 
            w={{ base: '100%', md: '300px' }} 
            size="md" 
            h={50} 
            variant="flushed" 
            fontSize={"xl"} 
            textAlign={'center'} 
          />
        </FormControl>
  
        <FormControl mt={4}>
          <Textarea 
            placeholder="Enter Poem Lyrics" 
            w={{ base: '100%', md: '500px' }} 
            fontSize={"8lg"} 
            textAlign={'center'} 
            variant="flushed" 
            height={{ base: '20vh', md: '60vh' }} 
            color={useColorModeValue("gray.800", "white" )}
          />
        </FormControl>
  
        <FormControl mt={4}>
          <Input 
            type="text" 
            placeholder="Enter Tags" 
            w={{ base: '100%', md: '500px' }} 
            textAlign={'center'} 
          />
        </FormControl>
      </Box>
    );
  };
  
  export default CreatePoem;