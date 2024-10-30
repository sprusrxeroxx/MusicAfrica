import { Box, Button, Heading, Input, useColorModeValue, VStack, Container, useToast } from '@chakra-ui/react';
import { useState } from 'react';
// import { useSongStore } from '../store/song';

const RegisterPage = () => {
    const [newUser, setNewUser] = useState({
        username:"",
        password:"",
        image:"",
        starsign:"",
        email:"",
    });

    // const toast = useToast();
    // const {createSong}=useSongStore();

    // const handleAddSong = async() => {
    //     const {success, message} = await createSong(newSong);
    //     if (!success) {
    //         toast({
    //             title:"Error",
    //             description: message,
    //             status: "error",
    //             isClosable: true,
    //         });
    //     } else {
    //         toast({
    //             title:"Success",
    //             description: message,
    //             status: "success",
    //             isClosable: true,
    //         });
    //     }
    // setNewSong({ title:"", artist:"", image:"", audioUrl:"", lyrics:"" });
    // };

    return (
        <Container maxW={"container.sm"}>
            <VStack
                spacing={8}
            >
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                    Setup Profile
                </Heading>

                <Box
                    w={"full"} bg={useColorModeValue("white", "gray.800")}
                    p={6} rounded={"lg"} shadow="md"
                >
                    <VStack spacing={4}>
                        <Input
                            placeholder='Username'
                            name='username'
                            value={newUser.username}
                            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                        />

                        <Input
                            placeholder='E-mail Address'
                            name='email'
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        />

                        <Input
                            placeholder='Profile Picture'
                            name='image'
                            value={newUser.image}
                            onChange={(e) => setNewUser({ ...newUser, image: e.target.value })}
                        />

                        <Input
                            placeholder='Starsign'
                            name='starsign'
                            value={newUser.starsign}
                            onChange={(e) => setNewUser({ ...newUser, starsign: e.target.value })}
                        />
                            <Input
                            placeholder='Your Password'
                            name='password'
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        />

                        <Button colorScheme='blue' /*onClick={handleAddSong}*/ w="full">
                            Add User
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default  RegisterPage;