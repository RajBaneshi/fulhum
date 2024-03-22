import { Button, useColorMode } from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from "react";

export const ColorModeToggler = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <header>
      <Button onClick={toggleColorMode}>
        <FontAwesomeIcon icon={colorMode === "light" ? faMoon : faSun} />
      </Button>
    </header>
  );
};