import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { Route, Routes } from "react-router-dom";
import HomePage from "./components/Pages/HomePage";
import NavBar from "./components/NavBar";
import CreateProduct from "./components/Pages/CreateProduct";
import { Box } from "@chakra-ui/react";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Box minH={"100vh"}>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateProduct />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
