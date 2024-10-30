import { Box, 
        Button, 
        Heading, 
        HStack, 
        IconButton, 
        Image, Input, Modal, 
        ModalBody, 
        ModalCloseButton, 
        ModalContent, 
        ModalFooter, 
        ModalHeader, 
        ModalOverlay, 
        Text, 
        useColorModeValue, 
        useDisclosure, 
        useToast, 
        VStack
    } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useSongStore } from "../store/song";
import { useState } from "react";

const SongCard = ({ song }) => {
    const [updatedSong, setUpdatedSong] = useState(song);


    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg=useColorModeValue("white", "gray.800");

    const { deleteSong, updateSong }=useSongStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDeleteSong = async (pid) => {
        const { success,message } = await deleteSong(pid);
        if(!success){
            toast({
                title:'Error',
                description: message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title:'Success',
                description: message,
                status: 'success',
                duration: 3000,
                isClosable: true,
        });
    }
};
    const handleUpdateSong = async (pid, updatedSong) => {
        const { success, message }= await updateSong(pid, updatedSong);
        onClose();
        if(!success){
            toast({
                title:'Error',
                description: message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title:'Success',
                description: message,
                status: 'success',
                duration: 3000,
                isClosable: true,
        });
    }
    }
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
                <Heading as='h3' size='md' mb={2}>
                    {song.title}
                </Heading>

                <Text fontWeight='bold' fontSize='x1' color={textColor} mb={4}>
                    {song.artist}
                </Text>

                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />}  onClick={onOpen}
                    colorScheme="blue" />
                    <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteSong(song._id)} colorScheme='red' />
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />

                <ModalContent>
                    <ModalHeader>Update Song</ModalHeader>
                    <ModalCloseButton></ModalCloseButton>
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder='Song Title' name='title' value={updatedSong.title}
                                onChange={(e) => setUpdatedSong({ ...updateSong, title:e.target.value })}
                            />

                            <Input
                                placeholder='Image Url' name='image' value={updatedSong.image}
                                onChange={(e) => setUpdatedSong({ ...updateSong, image:e.target.value })}
                            />

                            <Input
                            placeholder='Lyrics' name='lyrics' value={updatedSong.lyrics}
                            onChange={(e) => setUpdatedSong({ ...updateSong, lyrics:e.target.value })}
                            />

                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}
                            onClick={() => handleUpdateSong(song._id, updatedSong)}
                        >
                            Update
                        </Button>
                        <Button variable='ghost' onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>


            </Modal>
        </Box>
    );
};
export default SongCard;