import React from "react";
import { Button } from "@chakra-ui/react";

interface BotaoAcaoProps {
  onClick: () => void;
  icon: string;
  bg: string;
  color: string;
  hoverBg: string;
}

const BotaoAcao: React.FC<BotaoAcaoProps> = ({
  onClick,
  icon,
  bg,
  color,
  hoverBg,
}) => {
  return (
    <Button
      marginLeft={2}
      onClick={onClick}
      borderRadius="md"
      bg={bg}
      color={color}
      _hover={{ bg: hoverBg }}
    >
      {icon}
    </Button>
  );
};

export default BotaoAcao;
