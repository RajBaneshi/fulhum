import React, { useEffect } from "react";
import "./navbar.css";
import {
  Flex,
  Box,
  Heading,
  IconButton,
  Button,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Img,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { ColorModeToggler } from "./toggle";
import CompanyLogo from "../../assets/fullham.png";

const Navbar = ({ isLandscape, navRef }) => {
  const bgColor = useColorModeValue("whiteAlpha.800", "rgba(26, 32, 44, 0.80)"); //gray.800 with alpha

  useEffect(() => {
    const nav = document.querySelector(".nav");
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
      if (lastScrollY < window.scrollY) {
        nav.classList.add("nav--hidden");
      } else {
        nav.classList.remove("nav--hidden");
      }

      lastScrollY = window.scrollY;
    });
  });

  return (
    <Flex
      p={2}
      ref={navRef}
      alignItems="center"
      position={"sticky"}
      top={0}
      backdropFilter={"auto"}
      backdropBlur={"50px"}
      backgroundColor={bgColor}
      zIndex={100}
      className="nav"
    >
      <Box>
        <Heading as={Link} to="/" size="lg">
          <Img
            as="img"
            src={CompanyLogo}
            alt="Logo"
            width={"200px"}
            className="navbar-icon"
          />
        </Heading>
      </Box>
    </Flex>
  );
};

export default Navbar;
