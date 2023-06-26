import React, { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";

// Definindo a interface para um nó da árvore binária
interface NodoBinario {
  id: string;
  value: string;
  children: NodoBinario[];
}

const BinaryTree: React.FC = () => {
  const [expandedNodes, setExpandedNodes] = useState<string[]>([]);
  const [tree, setTree] = useState<NodoBinario>({
    id: uuidv4(),
    value: "start",
    children: [],
  });

  const toggleNode = (id: string) => {
    if (expandedNodes.includes(id)) {
      setExpandedNodes(expandedNodes.filter((nodeId) => nodeId !== id));
    } else {
      setExpandedNodes([...expandedNodes, id]);
    }
  };

  const addNode = (parentNode: NodoBinario) => {
    const newNode: NodoBinario = {
      id: uuidv4(),
      value: "new node",
      children: [],
    };

    parentNode.children.push(newNode);
    setTree({ ...tree });
    setExpandedNodes([...expandedNodes, newNode.id]);
  };

  const deleteNode = (nodeId: string, parentNode?: NodoBinario) => {
    const removeNode = (node: NodoBinario) => {
      if (node.id === nodeId) {
        if (parentNode) {
          const updatedChildren = parentNode.children.filter(
            (child) => child.id !== nodeId
          );
          parentNode.children = updatedChildren;
        } else {
          setTree({ id: uuidv4(), value: "start", children: [] });
        }
        setExpandedNodes(expandedNodes.filter((id) => id !== nodeId));
      } else {
        node.children.forEach((child) => removeNode(child));
      }
    };

    removeNode(tree);
  };

  const renderNodo = (
    node: NodoBinario,
    level: number,
    parentNode?: NodoBinario
  ): JSX.Element => {
    const indentation = level * 20;
    const hasChildren = node.children.length > 0;
    const isExpanded = expandedNodes.includes(node.id);

    return (
      <Box marginLeft={indentation} key={node.id}>
        <Box display="flex" alignItems="center">
          <Box
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            width={20}
            height={20}
            borderRadius="50%"
            backgroundColor="#ccc"
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
            +
          </Button>
          <Button
            marginLeft={2}
            onClick={() => deleteNode(node.id, parentNode)}
            borderRadius="md"
            bg="red.400"
            color="white"
            _hover={{ bg: "red.500" }}
          >
            🗑️
          </Button>
          {hasChildren && (
            <Button
              marginLeft={2}
              onClick={() => toggleNode(node.id)}
              borderRadius="md"
              bg="gray.400"
              color="white"
              _hover={{ bg: "gray.500" }}
            >
              {isExpanded ? "🔽" : "▶️"}
            </Button>
          )}
        </Box>
        {isExpanded &&
          node.children.map((child) => (
            <Box key={child.id}>{renderNodo(child, level + 1, node)}</Box>
          ))}
      </Box>
    );
  };

  return <Box>{renderNodo(tree, 0)}</Box>;
};

export default BinaryTree;
