import React, { useState } from "react";
import { Box, Container, Text, VStack } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import Node from "./Node";

interface BinaryTreeProps {}

interface ITreeNode {
  id: string;
  value: string;
  children: ITreeNode[];
}

const BinaryTree: React.FC<BinaryTreeProps> = () => {
  const [tree, setTree] = useState<ITreeNode>({
    id: uuidv4(),
    value: "start",
    children: [],
  });
  const [expandedNodes, setExpandedNodes] = useState<string[]>([tree.id]);

  const toggleNode = (id: string) => {
    if (expandedNodes.includes(id)) {
      setExpandedNodes(expandedNodes.filter((nodeId) => nodeId !== id));
    } else {
      setExpandedNodes([...expandedNodes, id]);
    }
  };

  const addNode = (parentNode: ITreeNode) => {
    const newNodePosition = parentNode.children.length + 1;
    const newNode: ITreeNode = {
      id: uuidv4(),
      value: newNodePosition.toString(),
      children: [],
    };

    parentNode.children.push(newNode);
    setTree({ ...tree });
    setExpandedNodes([...expandedNodes, newNode.id]);

    updateChildValues(parentNode);
  };

  const updateChildValues = (parentNode: ITreeNode) => {
    const parentValueParts =
      parentNode.value === "start" ? [] : parentNode.value.split(".");
    parentNode.children.forEach((child, index) => {
      const childValueParts = parentValueParts.concat((index + 1).toString());
      child.value = childValueParts.join(".");
      updateChildValues(child);
    });
  };

  const deleteNode = (nodeId: string, parentNode?: ITreeNode) => {
    const removeNode = (node: ITreeNode) => {
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
    node: ITreeNode,
    level: number,
    parentNode?: ITreeNode
  ): JSX.Element => {
    const indentation = level * 5;
    const isExpanded = expandedNodes.includes(node.id);

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
      event.dataTransfer.setData("text/plain", node.id);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const nodeId = event.dataTransfer.getData("text/plain");
      const draggedNode = findNodeById(tree, nodeId);
      if (draggedNode) {
        deleteNode(draggedNode.id, findParentNode(tree, draggedNode.id));
        addNode(node);
        // Adicionando os filhos do nó arrastado ao novo nó
        const newNode = node.children[node.children.length - 1];
        newNode.children = draggedNode.children;
        setTree({ ...tree });
        updateChildValues(newNode);
      }
    };

    const findNodeById = (
      startNode: ITreeNode,
      id: string
    ): ITreeNode | undefined => {
      if (startNode.id === id) {
        return startNode;
      }
      for (const child of startNode.children) {
        const foundNode = findNodeById(child, id);
        if (foundNode) {
          return foundNode;
        }
      }
      return undefined;
    };

    const findParentNode = (
      startNode: ITreeNode,
      id: string,
      parentNode?: ITreeNode
    ): ITreeNode | undefined => {
      if (startNode.id === id) {
        return parentNode;
      }
      for (const child of startNode.children) {
        const foundNode = findParentNode(child, id, startNode);
        if (foundNode) {
          return foundNode;
        }
      }
      return undefined;
    };

    return (
      <VStack paddingBottom={50} alignItems={"flex-start"}>
        <Box
          marginLeft={indentation}
          key={node.id}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          p={20}
        >
          <Node
            node={node}
            level={level}
            parentNode={parentNode}
            addNode={addNode}
            deleteNode={deleteNode}
            toggleNode={toggleNode}
            isExpanded={isExpanded}
            handleDragStart={handleDragStart}
          />
          {isExpanded &&
            node.children.map((child, index) => (
              <Box
                key={child.id}
                position="relative"
                paddingTop={2}
                paddingLeft={20}
                borderLeft="1px solid #000"
              >
                {renderNodo(child, level + 1, node)}
              </Box>
            ))}
        </Box>
      </VStack>
    );
  };

  return <Box>{renderNodo(tree, 0)}</Box>;
};

export default BinaryTree;
