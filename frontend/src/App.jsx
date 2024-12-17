import { Box, useColorModeValue } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import Navbar from './components/Navbar';
import RegisterPage from './pages/RegisterPage';
import CreatePoem from './pages/CreatePoemPage';

function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/poem" element={<CreatePoem />} />
      </Routes>
    </Box>
  );
}

export default App;