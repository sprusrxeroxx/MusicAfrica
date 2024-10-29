import { WarningIcon } from "@chakra-ui/icons/Warning";
import { Container, VStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <Container maxW='container.xl' py={12}>
            <VStack spacing={8}>
                <Text
                    fontSize={"30"}
                    fontWeight={"bold"}
                    bgGradient={"linear(to-r, cyan.400, blue.500)"}
                    bgClip={"text"}
                    textAlign={"center"}
                >
                    Current Songs
                </Text>
                
                
                <Text fontSize='x1' textAlign={"center"} fontWeight='bold' color='gray.500'>
                    No Songs found <WarningIcon/> {" "}
                    <Link to={"/create"}>
                        <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
                            Add a Song
                        </Text>
                    </Link>
                </Text>
            </VStack>
        </Container>
    )
};

export default  HomePage;