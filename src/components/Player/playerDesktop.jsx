import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Grid,
  GridItem,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faVolumeUp,
  faVolumeMute,
  faHandPointUp,
  faForward,
  faBackward,
  faExpand,
  faMicrophone,
  faMicrophoneSlash,
  faMessage,
  faL,
} from "@fortawesome/free-solid-svg-icons";
import Chat from "../chat/chat";
import Listening from "./listening";
import Error from "./error";
import Cookie from "universal-cookie";

function Desktop({
  isChatOpen,
  setIsChatOpen,
  isMicEnabled,
  playerContainerRef,
  videoRef,
  videoId,
  setVideoId,
  isHovering,
  setHovering,
  isPlaying,
  setIsPlaying,
  handlePlayPause,
  handleNext,
  handlePrevious,
  handleFullScreen,
  handleMicToggle,
  timeoutRef,
  isFullScreen,
  isLandscape,
  error,
  messages,
  setMessages,
  first,
  info,
  fetched,
  setFetched,
  handleSearch,
  isTyping,
  fallback,
  setFallback,
  layoutAlert,
  setLayoutAlert,
  createCookie,
  appointment,
  setAppointment,
  chatemail,
  setChatemail,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [muted, setMuted] = useState(false);
  const [height, setHeight] = useState("h-[70%]");
  const [nHeight, setnHeight] = useState(0);
  const [nWidth, setnWidth] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  // const [getCallback, setCallback] = useState(false)
  const [virtualtool, setVirtualtool] = useState(false)
  const cookie = new Cookie();

  useEffect(() => {
    // if (!cookie.get("showDisclaimer")) {
      onOpen();
    //   createCookie("showDisclaimer", true, 0.25);
    // }
    // isOpen;
    const rect = videoRef.current.getBoundingClientRect();
    if (rect.width > rect.height) {
      setnHeight(rect.height + "px");
      setnWidth((rect.height / 9) * 16 + "px");
    } else {
      setnWidth(rect.width + "px");
      setnHeight((rect.width / 16) * 9 + "px");
    }
    // console.log();
    // setnWidth(rect.width);
    // setnHeight(rect.height);
    console.log(rect);
  }, []);

  const handleVolumeToggle = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    video.muted = !video.muted;
    setMuted(!muted);
  };

  const handleMouseMove = (e) => {
    setHovering(true);
    e.stopPropagation();
    // If there is a previous timeout, clear it to start a new one
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Start a new timeout to hide the controls after 10 seconds of inactivity
    timeoutRef.current = setTimeout(() => {
      setHovering(false);
    }, 10000);
  };

  console.log("appointment : ", appointment);
  return (
    <div className="h-[90%] lg:p-2">
      {/* DISCLAIMER */}

      {appointment && (
        <Modal className="w-full h-auto" isOpen={appointment}>
          <ModalOverlay />
          <ModalContent className="mx-2">
            <ModalCloseButton
              onClick={() => {
                setAppointment(false);
              }}
            ></ModalCloseButton>
            <ModalHeader className="flex items-center justify-center my-4">
              <p className="text-sky-700 font-thin text-4xl">
                Book Appointment
              </p>
            </ModalHeader>
            <ModalBody className="overflow-y-auto">
              <p className="mb-6">
                Please provide your email address and you will be Contacted soon
                by fulham school
              </p>

              <h1 className="ml-1 text-sky-700 font-thin mb-2 font-bold">
                Name :{" "}
              </h1>
              <input
                type="text"
                className="mb-6 rounded-lg p-2 w-full border border-gray-900"
              />
              <h1 className="ml-1 text-sky-700 font-thin mb-2 font-bold">
                Email Address :{" "}
              </h1>
              <input
                type="email"
                className="mb-6 rounded-lg p-2 w-full border border-gray-900"
              />
            </ModalBody>
            <ModalFooter
              justifyContent={"center"}
              className="flex items-center"
            >
              <button
                className="bg-sky-700 px-8 py-2 rounded-2xl text-white mb-6"
                onClick={() => {
                  setAppointment(false);
                }}
              >
                Submit
              </button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {chatemail && (
        <Modal className="w-full h-auto" isOpen={chatemail}>
          <ModalOverlay />
          <ModalContent className="mx-2">
            <ModalCloseButton
              onClick={() => {
                setChatemail(false);
              }}
            ></ModalCloseButton>
            <ModalHeader className="flex items-center justify-center my-4">
              <p className="text-sky-700 font-thin text-4xl">Share on Email</p>
            </ModalHeader>
            <ModalBody className="overflow-y-auto">
              <p className="mb-6">
                Please provide your email address and you will have your chat
                history on provided email address
              </p>

              <h1 className="ml-1 text-sky-700 font-thin mb-2 font-bold">
                Name :{" "}
              </h1>
              <input
                type="text"
                className="mb-6 rounded-lg p-2 w-full border border-gray-900"
              />
              <h1 className="ml-1 text-sky-700 font-thin mb-2 font-bold">
                Email Address :{" "}
              </h1>
              <input
                type="email"
                className="mb-6 rounded-lg p-2 w-full border border-gray-900"
              />
            </ModalBody>
            <ModalFooter
              justifyContent={"center"}
              className="flex items-center"
            >
              <button
                className="bg-sky-700 px-8 py-2 rounded-2xl text-white mb-6"
                onClick={() => {
                  setChatemail(false);
                }}
              >
                Submit
              </button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}



{virtualtool && (
        <Modal className="w-full h-auto" isOpen={virtualtool}>
          <ModalOverlay />
          <ModalContent className="mx-2">
            <ModalCloseButton
              onClick={() => {
                setVirtualtool(false);
              }}
            ></ModalCloseButton>
            <ModalHeader className="flex items-center justify-center my-4">
              <p className="text-sky-700 font-thin text-4xl">
                Book a Virtual Tool
              </p>
            </ModalHeader>
            <ModalBody className="overflow-y-auto">
              <p className="mb-6">
                Please provide your email address and you will be Contacted soon
                by fulham school
              </p>

              <h1 className="ml-1 text-sky-700 font-thin mb-2 font-bold">
                Name :{" "}
              </h1>
              <input
                type="text"
                className="mb-6 rounded-lg p-2 w-full border border-gray-900"
              />
              <h1 className="ml-1 text-sky-700 font-thin mb-2 font-bold">
                Email Address :{" "}
              </h1>
              <input
                type="email"
                className="mb-6 rounded-lg p-2 w-full border border-gray-900"
              />
              <h1 className="ml-1 text-sky-700 font-thin mb-2 font-bold">
                Contact No. :{" "}
              </h1>
              <input
                type="phone"
                className="mb-6 rounded-lg p-2 w-full border border-gray-900"
              />
            </ModalBody>
            <ModalFooter
              justifyContent={"center"}
              className="flex items-center"
            >
              <button
                className="bg-sky-700 px-8 py-2 rounded-2xl text-white mb-6"
                onClick={() => {
                  setVirtualtool(false);
                }}
              >
                Submit
              </button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      <Modal className="w-full h-auto" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent className="mx-2">
          <ModalHeader className="flex items-center justify-center my-4">
            <p className="text-sky-700 font-thin text-4xl">Disclaimer</p>
          </ModalHeader>
          <ModalBody className="overflow-y-auto">
            <p>Thank you for using the AI Rep.</p>
            <p>
              The AI Rep is an automated computer program designed to provide
              general informational assistance only and any information provided
              by the AI Rep should not be relied on when taking any action. By
              using the AI Rep you agree to the website terms of use and in
              particular the AI Rep Disclaimer which is available at{" "}
              <a
                className="text-sky-500"
                href="https://www.fulham.school/website-terms-use"
                target="_blank"
              >
                here
              </a>
              . We may collect personal information when you interact with the
              AI Rep in accordance with our Privacy Policy which is available at{" "}
              <a
                className="text-sky-500"
                href="https://www.fulham.school/privacy-policy"
                target="_blank"
              >
                here
              </a>
              . We will only use this information for the purposes of responding
              to your queries. We will not share your personal information with
              third parties unless we have your consent or are required by law
              to do so.
            </p>
          </ModalBody>
          <ModalFooter justifyContent={"center"} className="flex items-center">
            <button
              className="bg-sky-700 px-8 py-2 rounded-2xl text-white"
              onClick={()=>{
                onClose()
                handlePlayPause()
              }}
            >
              Accept
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* {layoutAlert && ( */}
      <Modal className="w-full h-auto" isOpen={layoutAlert}>
        <ModalOverlay />
        <ModalContent className="mx-2">
          {/* <ModalHeader className="flex items-center justify-center my-4">
              <p className="text-sky-700 font-thin text-4xl">Disclaimer</p>
            </ModalHeader> */}
          <ModalBody className="overflow-y-auto text-xl text-center">
            <p>Please use portrait mode for optimal experience!</p>
          </ModalBody>
          <ModalFooter
            justifyContent={"center"}
            alignItems={"center"}
            className="flex items-center"
          >
            <button
              className="bg-sky-700 px-8 py-2 rounded-full text-white border-none shadow"
              onClick={() => {
                setLayoutAlert(false);
                createCookie("layoutAlert", true, 1);
              }}
            >
              Close
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* )} */}

      {/* PLAYER SECTION */}
      {/* <div className="h-full sm:flex-col lg:grid lg:grid-flow-row-dense lg:grid-cols-11 lg:h-5/6 lg:mx-16"> */}
      <div className="h-full sm:flex-col lg:flex lg:flex-row lg:h-[90%] lg:mx-16">
        {/* VIDEO */}
        <div className="w-full lg:w-[70%] lg:pt-4">
          <div
            ref={playerContainerRef}
            className="relative flex justify-center bg-black w-full h-fit"
            // onClick={handlePlayPause}
            onLoadedData={() => {
              if (!first) handlePlayPause();
            }}
            onMouseMove={handleMouseMove}
            onKeyDown={(e) => {
              e.stopPropagation();
              console.log(e.key);
            }}
          >
            <Box
              as="video"
              ref={videoRef}
              playsInline
              width="100%"
              height={isChatOpen ? "100%" : isFullScreen ? "100%" : "70vh"}
              onClick={handlePlayPause}
              onEnded={() => {
                setIsPlaying(false);
                if (videoId === 2803) {
                  setFetched(fallback);
                  // setFallback(null)
                }
              }}
              poster="/fallback6.png"
              controls={false}
            >
              <source
                src={
                  videoId
                    ? `${import.meta.env.VITE_BACKEND_URL}/video?id=${videoId}`
                    : ""
                }
                type="video/mp4"
              />
            </Box>

            <Box
              className={`absolute flex align-start justify-end w-full h-full backdrop-filter ${
                error || info || isMicEnabled ? "brightness-30" : "none"
              }}`}
              // backdropFilter={
              //   error || info || isMicEnabled ? "brightness(30%)" : "none"
              // }
            >
              {isMicEnabled && <Listening isLandscape={isLandscape} />}
            </Box>
            {fetched && (
              <div
                // className='absolute h-5/6 w-3/5 top-16 left-36 lg:top-28 lg:left-96 overflow-auto'
                className="absolute flex overflow-auto justify-center items-center"
                style={{
                  // height: {`${videoRef.current.height}`,
                  height: "100%",
                  width: "100%",
                  "::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "::-webkit-scrollbar-track": {
                    background: "transparent",
                  },
                  "::-webkit-scrollbar-thumb": {
                    background: "rgba(0, 0, 0, 0.2)",
                    borderRadius: "8px",
                  },
                  "::-webkit-scrollbar-thumb:hover": {
                    background: "rgba(0, 0, 0, 0.3)",
                  },
                }}
              >
                <div
                  style={{
                    width: "30%",
                  }}
                />
                <div
                  style={{
                    height: nHeight,
                    width: nWidth,
                  }}
                  className={`w-[60%] overflow-auto`}
                >
                  <p
                    className="p-5 bg-blue-200 text-blue-800 text-md font-mono"
                    style={{
                      // background: '#a6d8fc',
                      background: "none",
                      zIndex: "2",
                    }}
                  >
                    {fetched}
                  </p>
                </div>
              </div>
            )}
            {/* {(error || info) && !isMicEnabled && (
              <Error error={error ? error : info} isPlaying={isPlaying} />
            )} */}
            {/* Custom Controls */}
            {isHovering && !error && (info || !info) && (
              <Box
                position="absolute"
                bottom={0}
                left={0}
                width="100%"
                padding="10px"
                display="flex"
                zIndex="10"
                alignItems="center"
                justifyContent="space-between"
                backgroundColor="rgba(0, 0, 0, 0.6)"
                // backdropFilter="blur(10px)"
              >
                <Button
                  // colorScheme={!isMicEnabled ? "blue" : "green"}
                  // onClick={handleMicToggle}
                  onClick={handlePlayPause}
                  variant="outline"
                  _hover={{
                    bg: "transparent",
                    borderColor: "white",
                    borderWidth: "1px",
                  }}
                >
                  {/* {!isMicEnabled ? "Let's talk" : "Stop Talk"} */}
                  <FontAwesomeIcon
                    icon={!isPlaying ? faPlay : faPause}
                    color="white"
                  />
                </Button>

                <div style={{ display: "flex" }}>
                  <Box display="flex" alignItems="center">
                    <IconButton
                      icon={
                        <FontAwesomeIcon
                          icon={muted ? faVolumeMute : faVolumeUp}
                          color="#fff"
                        />
                      }
                      onClick={handleVolumeToggle}
                      aria-label="Toggle Volume"
                      bg="transparent"
                      _hover={{
                        bg: "transparent",
                        borderColor: "white",
                        borderWidth: "1px",
                      }}
                    />
                  </Box>
                  {/* <Box display="flex" alignItems="center">
                    <IconButton
                      icon={
                        <FontAwesomeIcon
                          icon={
                            !isMicEnabled ? faMicrophone : faMicrophoneSlash
                          }
                          color="#fff"
                        />
                      }
                      onClick={handleMicToggle}
                      aria-label="Toggle Mic"
                      bg="transparent"
                      style={{
                        bg: "transparent",
                        borderColor: "white",
                        borderWidth: "1px",
                      }}
                    /> */}

                  {/* <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  position={"absolute"}
                  width={"100%"}
                  height={"100%"}
                >
                  <FontAwesomeIcon
                    icon={!isPlaying ? faPlay : faPause}
                    color="white"
                  />
                </Box>
                 */}
                  {/* <Button
                    colorScheme={!isMicEnabled ? "green" : "red"}
                    onClick={handleMicToggle}
                    variant="outline"
                    _hover={{
                      bg: "transparent",
                      borderColor: "white",
                      borderWidth: "1px",
                    }}
                  >
                    {!isMicEnabled ? "Let's talk" : "Stop Talk"}
                  </Button> */}
                  {/* <IconButton
                    icon={<FontAwesomeIcon icon={faExpand} color="#fff" />}
                    onClick={handleFullScreen}
                    aria-label="Toggle Fullscreen"
                    bg="transparent"
                    _hover={{
                      bg: "transparent",
                      borderColor: "white",
                      borderWidth: "1px",
                    }}
                  /> */}
                  {/* </Box> */}
                </div>
              </Box>
            )}
          </div>
        </div>

        {/* CHAT */}
        <div
          // className={`lg:col-span-4 lg:row-span-1 ${height} w-full lg:p-4 lg:w-full lg:h-fit flex`}
          className={`${height} w-full lg:p-4 lg:w-[30%] flex lg:h-full`}
        >
          {!isFullScreen && (
            <Chat
              isLandscape={isLandscape}
              setVideoId={setVideoId}
              isFullScreen={isFullScreen}
              messages={messages}
              setMessages={setMessages}
              handleSearch={handleSearch}
              setFetched={setFetched}
              videoRef={videoRef}
              isTyping={isTyping}
              height={height}
              setHeight={setHeight}
              isMicEnabled={isMicEnabled}
              handleMicToggle={handleMicToggle}
            />
          )}
        </div>

        {showOptions && (
          <div className="absolute flex flex-col align-end bottom-4 end-4 w-60">
            <div className="flex w-full justify-end">
            <button  onClick={() => { setShowOptions(false)}}
              className="flex justify-center px-3 py-1 border border-gray-300 bg-gray-50 text-md text-gray-700 mb-2 rounded-full shadow-md font-bold font-sans"
            >x
            </button>
            </div>
        
            <button
              onClick={() => {
                setChatemail(true);
                setShowOptions(false);
              }}
              className="flex justify-center w-full py-2 border border-gray-300 bg-gray-50 text-md text-gray-700 mb-2 rounded-full shadow-lg font-bold font-sans"
            >
              Share Chat via E-Mail
            </button>
            <button
              onClick={() => {
                setAppointment(true);
                setShowOptions(false);
              }}
              className="flex justify-center w-full py-2 border border-gray-300 bg-gray-50 text-md text-gray-700 mb-2 rounded-full shadow-lg font-bold font-sans"
            >
              Book an Appointment
            </button>
            <button
              onClick={() => {
                setVirtualtool(true);
                setShowOptions(false);
              }}
              className="flex justify-center w-full py-2 border border-gray-300 bg-gray-50 text-md text-gray-700 mb-2 rounded-full shadow-lg font-bold font-sans"
            >
              Book a Virtual Tour
            </button>
            <a href="https://fulhamschool.openapply.com/apply/forms/41313?frame=true&_gl=1*1sigr5s*_ga*OTMyNjgxODI2LjE2OTg5MjU2ODE.*_ga_BPTZ7GJJ9N*MTcwNzg5MzA0Mi40LjAuMTcwNzg5MzA0Mi42MC4wLjA.">
            <button
              
              onClick={() => {
                setShowOptions(false);
              }}
              className="flex justify-center w-full py-2 border border-gray-300 bg-gray-50 text-md text-gray-700 mb-2 rounded-full shadow-lg font-bold font-sans"
            >
             Get Callback
            </button>
            </a>
          </div>
        )}

        {!showOptions && (
          <button 
          onClick={()=>{setShowOptions(true)}}
          className="absolute p-4 bg-gray-50 text-md border border-4 border-blue-600 rounded-full shadow-lg font-bold bottom-4 end-4">
            <FontAwesomeIcon
              icon={faHandPointUp}
              color="white"
              className="w-6 h-5 text-blue-800"
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default Desktop;
