import {
  Box,
  Flex,
  Button,
  Input,
  IconButton,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faMicrophone,
  faMicrophoneSlash,
} from "@fortawesome/free-solid-svg-icons";
import Linkify from "react-linkify";
import Filter from "bad-words";
import { useEffect, useState } from "react";
import { logDOM } from "@testing-library/react";
import axios from "axios";
import Like from "./like";
import TypingIndicator from "../typingIndicator";
function ChatArea({
  messages,
  expandedMessages,
  toggleExpandMessage,
  chatContainerRef,
  chatRef,
  typed,
  setTyped,
  handleSendMessage,
  isFullScreen,
  isTyping,
  setHeight,
  isMicEnabled,
  handleMicToggle,
}) {



  console.log("messages : ", messages)
  const sender = useColorModeValue("blue.300", "blue.600");
  const other = useColorModeValue("gray.300", "gray.600");
  const chat = useColorModeValue("whiteAlpha.800", "gray.800");
  var customFilter = new Filter();
  customFilter.addWords("fuckoff", "fuck off");

  const storeReviewData = async (
    msgId = null,
    like = false,
    dislike = false,
    updatedans = null
  ) => {
    let data = {
      msgId: msgId,
      like: like,
      dislike: dislike,
      updatedans: updatedans,
    };
    if (like) {
      data.like = like;
    }
    if (dislike) {
      data.dislike = dislike;
    }
    if (updatedans != null) {
      data.updatedans = updatedans;
    }
    console.log(data);
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_BACKEND_URL}/query/reviews`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .request(config)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      // position="absolute"
      // right={isFullScreen ? "1.25%" : "unset"}
      // bottom={isFullScreen ? "9%" : "unset"}
      // width="100%" // Adjust the width of the card as per your requirement
      // height={isFullScreen ? "90%" : "65%"} // Adjust the max height of the card as per your requirement
      // height="90%"
      // padding="20px"
      // display="flex"
      // flexDirection="column"
      // alignItems="center"
      // justifyContent="center"
      // backgroundColor={isFullScreen ? chat : ""}
      // backdropFilter="blur(10px)"
      // borderRadius={isFullScreen ? "md" : "none"}
      className={`flex flex-col w-full h-[90%] p-2 justify-center items-center rounded-md sm:hadow-md`}
      // className={`absolute ${isFullScreen ? "right-1.25%" : "unset"} ${
      //   isFullScreen ? "bottom-9%" : "unset"
      // } w-full ${
      //   isFullScreen ? "h-90%" : "h-65%"
      // }      h-90% p-20 flex flex-col items-center justify-center      ${
      //   isFullScreen ? "bg-chat" : ""
      // } backdrop-filter-blur-10 ${
      //   isFullScreen ? "rounded-md" : "rounded-none"
      // }`}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div
        className={`flex flex-col w-full h-full overflow-y-auto mt-3 rounded-md px-2 py-1`}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              msg.sender === "user" ? "justify-end" : "justify-start "
            }  ${msg.sender === "user" ? "items-end" : "items-start"} mb-1`}
          >
            <div
              style={{
                maxWidth: "70%",
              }}
              className={`rounded-md shadow-md p-2 ${
                msg.sender === "user" ? "bg-blue-300" : "bg-gray-200"
              } mb-2`}
            >
              {msg.text.length > 100 && !expandedMessages.includes(msg.id) ? (
                <>
                  {msg.text.slice(0, 100)}{" "}
                  <Button
                    size="sm"
                    variant="link"
                    // color="blue.500"
                    onClick={() => toggleExpandMessage(msg.id)}
                  >
                    Read More
                  </Button>
                </>
              ) : (
                <Linkify
                  componentDecorator={(decoratedHref, decoratedText, key) => (
                    <Link
                      color={"#1a428a"}
                      fontWeight={"bold"}
                      target={decoratedHref}
                      href={decoratedHref}
                      key={key}
                    >
                      {decoratedText}
                    </Link>
                  )}
                >
                  {msg.text}
                </Linkify>
              )}
            </div>
            {msg.sender === "other" && (
              <Like storeReviewData={storeReviewData} id={msg.id} />
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <TypingIndicator />
          </div>
        )}
        <div ref={chatContainerRef}></div>
      </div>
      <div className={`flex items-center mt-[2%] w-full`}>
        <Box display="flex" alignItems="center"
        style={{marginRight:"1px"}}
        >
          <IconButton
            icon={
              <FontAwesomeIcon
                icon={!isMicEnabled ? faMicrophone : faMicrophoneSlash}
                color="#fff"
              />
            }
            onClick={handleMicToggle}
            aria-label="Toggle Mic"
            bg="#6495ED"
            style={{
              bg: "white",
              borderColor: "white",
              borderWidth: "1px",
            }}
          />
        </Box>
        <input
          ref={chatRef}
          style={{borderLeft:'none'}}
          placeholder="Type your message..."
          className={`w-full shadow-md px-2 py-2 rounded`}
          onFocus={() => {
            setHeight("h-[20%]");
            setTimeout(() => {
              window.scrollTo(0, 5);
              document.body.scrollTop = 0;
            }, 50);
          }}
          onBlur={() => {
            setHeight(() => "h-full");
            if (typed && typed.length > 0) {
              handleSendMessage(customFilter.clean(typed).replace(/\*/g, ""));
            }
          }}
          // backgroundColor="rgba(255, 255, 255, 0.4)"
          onChange={(e) => {
            setTyped(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (typed && typed.length > 0) {
                chatRef.current.blur();
                // handleSendMessage(customFilter.clean(typed).replace(/\*/g, ""));
              }
            }
          }}
        />
        {/* Send button */}
        <IconButton
          ml="10px"
          icon={<FontAwesomeIcon icon={faPaperPlane} />}
          aria-label="Send"
          bg="transparent"
          // color="white"
          _hover={{ bg: "transparent" }}
          onClick={() => {
            if (typed && typed.length > 0) {
              handleSendMessage(customFilter.clean(typed).replace(/\*/g, ""));
            }
          }}
        />
      </div>
    </div>
  );
}

export default ChatArea;
