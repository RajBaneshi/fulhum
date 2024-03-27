import React, { useEffect, useState, useRef } from "react";
import { Route, Routes, BrowserRouter, useNavigate } from "react-router-dom";
import { ChakraProvider, useMediaQuery } from "@chakra-ui/react";
import Navbar from "./components/Navbar/navbar";
import Player from "./pages/player";
import LandingPage from "./pages/landing";

import { logger } from "./util/logging";
import FileUploadComponent from "./components/fileupload";
import Fingerprint from "./components/Fingerprint/fingerprint";
import Disclaimer from "./pages/disclaimer";
import PrivacyPolicy from "./pages/privacyPolicy";

// Custom Layout component to protect routes
const Layout = ({ element: Element }) => {
  const [isLandscape] = useMediaQuery("(orientation: landscape)");
  const navRef = useRef(null);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  });

  const hiddenElements = document.querySelectorAll(".hidden");
  hiddenElements.forEach((elem) => observer.observe(elem));

  return (
    <>
      <Navbar navRef={navRef} isLandscape={isLandscape} />
      <Element
        navRef={navRef}
        isLandscape={isLandscape}
        style={{ paddingTop: navRef && navRef.current && navRef.current?.getBoundingClientRect().height - 4}}
      />
    </>
  );
};

const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/player" element={<Layout element={Player} />} />
        <Route
          path="/upload"
          element={<Layout element={FileUploadComponent} />}
        />
        <Route path="/" element={<Layout element={LandingPage} />} />
        <Route path="/sessions" element={<Layout element={Fingerprint} />} />
        <Route
          path="/privacy-policy"
          element={<Layout element={PrivacyPolicy} />}
        />
        <Route path="/disclaimer" element={<Layout element={Disclaimer} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default function App() {
  return (
    <ChakraProvider>
      <Main />
    </ChakraProvider>
  );
}
