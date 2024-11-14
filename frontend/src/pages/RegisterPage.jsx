import { 
    Box, 
    Button, 
    Heading, 
    Input, 
    useColorModeValue, 
    VStack, Container, 
    useToast 
} from '@chakra-ui/react';
import { useState } from 'react';
import { useUserStore } from '../store/user';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [newUser, setNewUser] = useState({
        username:"",
        password:"",
        firebaseUid:"",
        email:"",
});

    const toast = useToast();
    const {createUser}=useUserStore();

    const handleAddUser = async() => {
        const {success, message} = await createUser(newUser);
        if (!success) {
            toast({
                title:"Error",
                description: message,
                status: "error",
                isClosable: true,
            });
        } else {
            toast({
                title:"Success",
                description: message,
                status: "success",
                isClosable: true,
            });
        }
    setNewUser({ title:"", username:"", password:"" });
    window.location.href = message.redirectUrl;
    };

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
                            placeholder='E-mail'
                            name='email'
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        />

                        <Input
                            type="password"
                            placeholder='Password'
                            name='password'
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        />

                        <Button colorScheme='blue' onClick={handleAddUser} w="full">
                            Register
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default  RegisterPage;