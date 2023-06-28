import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider, Stack, Text, VStack } from "@chakra-ui/react";
import BinaryTree from "./components/BinaryTree";
import "./index.css";

ReactDOM.render(
  <ChakraProvider>
    <Stack
      position={"relative"}
      minH={"100vh"}
      bgGradient="linear(to-b, rgba(255,88,36,1) 1%, rgba(255,106,22,1) 8%, rgba(235,230,230,1) 17%, rgba(250,250,250,1) 100%)"
    >
      <Text fontSize="6xl" h={100} align={"center"}>
        🌳 React Binary Tree
      </Text>
      <BinaryTree />
    </Stack>
    <Stack
      position={"absolute"}
      bottom={0}
      minH={"25vh"}
      minW={"100vw"}
      className="footer"
      backgroundSize={"cover"}
    />
  </ChakraProvider>,
  document.getElementById("root")
);
