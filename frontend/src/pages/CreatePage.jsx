import { Box, Button, Heading, Input, useColorModeValue, VStack, Container } from '@chakra-ui/react';
import { useState } from 'react';
import { useSongStore } from '../store/song';

const CreatePage = () => {
    const [newSong, setNewSong] = useState({
        title:"",
        artist:"",
        image:"",
        audioUrl:"",
        duration:"",
        lyrics:"",
    });

    const {createSong}=useSongStore();

    const handleAddSong = async() => {
        const {success, message} = await createSong(newSong);
        console.log("Success:", success);
        console.log("Message:", message);
    };

    return (
        <Container maxW={"container.sm"}>
            <VStack
                spacing={8}
            >
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                    Add New Song
                </Heading>

                <Box
                    w={"full"} bg={useColorModeValue("white", "gray.800")}
                    p={6} rounded={"lg"} shadow="md"
                >
                    <VStack spacing={4}>
                        <Input
                            placeholder='Song Title'
                            name='title'
                            value={newSong.title}
                            onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
                        />

                        <Input
                            placeholder='Artist'
                            name='artist'
                            value={newSong.artist}
                            onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
                        />

                        <Input
                            placeholder='Image URL'
                            name='image'
                            value={newSong.image}
                            onChange={(e) => setNewSong({ ...newSong, image: e.target.value })}
                        />

                        <Input
                            placeholder='Song URL'
                            name='audioUrl'
                            value={newSong.audioUrl}
                            onChange={(e) => setNewSong({ ...newSong, audioUrl: e.target.value })}
                        />
                            <Input
                            placeholder='Lyrics'
                            name='lyrics'
                            value={newSong.lyrics}
                            onChange={(e) => setNewSong({ ...newSong, lyrics: e.target.value })}
                        />

                        <Button colorScheme='blue' onClick={handleAddSong} w="full">
                            Add Song
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default  CreatePage;