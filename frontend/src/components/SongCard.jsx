import { Box, Heading, HStack, IconButton, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

const SongCard = ({song}) => {
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg=useColorModeValue("white", "gray.800");
    return (
        <Box
            shadow="lg"
            rounded='lg'
            overflow='hidden'
            transition='all 0.3s'
            _hover={{ transform: "translateY(-5px)", shadow: "x1" }}
            bg={bg}
        >
            <Image src={song.image} alt={song.title} h={48} w='full' objectFit='cover' />
            <Box p={4}>
                <Heading as='h3' size='md' mb={2}>``
                    {song.title};
                </Heading>

                <Text fontWeight='bold' fontSize='x1' color={textColor} mb={4}>
                    {song.artist};
                </Text>

                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />}  colorScheme="blue" />
                    <IconButton icon={<DeleteIcon />} colorScheme='red' />
                </HStack>
            </Box>
        </Box>
    );
};
export default SongCard;