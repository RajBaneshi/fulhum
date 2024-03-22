import { useRef, useState, useEffect } from "react";
import ChatArea from "./chatDesktop";

function Chat({
  isLandscape,
  setVideoId,
  isFullScreen,
  messages,
  setMessages,
  handleSearch,
  setFetched,
  videoRef,
  isTyping,
  height,
  setHeight,
  isMicEnabled,
  handleMicToggle
}) {
  const [typed, setTyped] = useState("");
  const chatRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [expandedMessages, setExpandedMessages] = useState([]);

  useEffect(() => {
    if (chatContainerRef.current) {
      console.log("Scrolling chat components into view!")
      chatContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const toggleExpandMessage = (messageId) => {
    setExpandedMessages((prevExpanded) =>
      prevExpanded.includes(messageId)
        ? prevExpanded.filter((id) => id !== messageId)
        : [...prevExpanded, messageId]
    );
  };

  const handleSendMessage = (message) => {
    
    // Add the new message to the messages state
    if (messages.length > 0) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: message, sender: "user" },
      ]);
    } else {
      setMessages([{ id: 1, text: message, sender: "user" }]);
    }
    setHeight(()=>("h-[70%]"));
    console.log(messages);
    chatRef.current.value = "";
    chatRef.current.blur();
    handleSearch(message, 'chatbot')
    setTyped(()=>(""));
  };

  return (
    <>
        <ChatArea
          messages={messages}
          expandedMessages={expandedMessages}
          toggleExpandMessage={toggleExpandMessage}
          chatContainerRef={chatContainerRef}
          chatRef={chatRef}
          typed={typed}
          setTyped={setTyped}
          handleSendMessage={handleSendMessage}
          isFullScreen={isFullScreen}
          isTyping={isTyping}
          setHeight={setHeight}
          isMicEnabled={isMicEnabled}
          handleMicToggle={handleMicToggle}
        />
    </>
  );
}

export default Chat;
