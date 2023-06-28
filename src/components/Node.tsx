import React from "react";
import { Box, Button } from "@chakra-ui/react";
import {
  AddIcon,
  DeleteIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

interface ITreeNodeProps {
  node: ITreeNode;
  level: number;
  parentNode?: ITreeNode;
  addNode: (parentNode: ITreeNode) => void;
  deleteNode: (nodeId: string, parentNode?: ITreeNode) => void;
  toggleNode: (id: string) => void;
  isExpanded: boolean;
  handleDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
}

interface ITreeNode {
  id: string;
  value: string;
  children: ITreeNode[];
}

const Node: React.FC<ITreeNodeProps> = ({
  node,
  level,
  parentNode,
  addNode,
  deleteNode,
  toggleNode,
  isExpanded,
  handleDragStart,
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      draggable
      onDragStart={handleDragStart}
    >
      <Box
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        width={20}
        height={20}
        borderRadius="50%"
        backgroundColor="#509AFC"
      >
        <span>{node.value}</span>
      </Box>
      <Button
        marginLeft={2}
        onClick={() => addNode(node)}
        borderRadius="md"
        bg="green.400"
        color="white"
        _hover={{ bg: "green.500" }}
      >
        <AddIcon />
      </Button>
      <Button
        marginLeft={2}
        onClick={() => deleteNode(node.id, parentNode)}
        borderRadius="md"
        bg="red.400"
        color="white"
        _hover={{ bg: "red.500" }}
      >
        <DeleteIcon />
      </Button>
      {node.children.length > 0 && (
        <Button
          marginLeft={2}
          onClick={() => toggleNode(node.id)}
          borderRadius="md"
          bg="blue.300"
          color="white"
          _hover={{ bg: "blue.300" }}
        >
          {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
        </Button>
      )}
    </Box>
  );
};

export default Node;
