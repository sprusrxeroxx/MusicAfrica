import { WarningIcon } from "@chakra-ui/icons/Warning";
import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSongStore } from "../store/song";
import SongCard  from "../components/SongCard";

const HomePage = () => {
    const { fetchSongs, songs} = useSongStore();

    useEffect(() => {
        fetchSongs();
    },  [fetchSongs]);
    console.log("songs", songs);

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

                <SimpleGrid
                    columns={{
                        base:1,
                        md:2,
                        lg:3
                    }}
                    spacing={10}
                    w={"full"}
                >
                    {songs.map((song) => (
                        <SongCard key={song._id} song={song} />
                    ))}
                </SimpleGrid>

                {songs.length === 0 && (
                    <Text fontSize='x1' textAlign={"center"} fontWeight='bold' color='gray.500'>
                        No Songs found <WarningIcon/> {" "}
                        <Link to={"/create"}>
                            <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
                                Add a Song
                            </Text>
                        </Link>
                    </Text>
                )}
            </VStack>
        </Container>
    )
};

export default  HomePage;