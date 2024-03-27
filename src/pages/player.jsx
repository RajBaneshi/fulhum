import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Desktop from "../components/Player/playerDesktop";
import { getTokenOrRefresh } from "../util/token_util";
import { ResultReason } from "microsoft-cognitiveservices-speech-sdk";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as speechsdk from "microsoft-cognitiveservices-speech-sdk";
import Filter from "bad-words";
import Cookie from "universal-cookie";

function Player({ isLandscape, navRef }) {
  axios.defaults.withCredentials = true;
  const [messages, setMessages] = useState([]);
  const [first, setFirst] = useState(true);
  const [info, setInfo] = useState("Humanoid: Tap to start");
  const [error, setError] = useState(null);
  const [query, setQuery] = useState([]);
  const [isHovering, setHovering] = useState(false);
  const [isMicEnabled, setIsMicEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wasPlaying, setWasPlaying] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const timeoutRef = useRef(null);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const videoRef = useRef(null);
  const playerContainerRef = useRef(null);
  const recognizer = useRef(null);
  const [fetched, setFetched] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [appointment, setAppointment] = useState(false)
  const [fallback, setFallback] = useState(null);
  const cookie = new Cookie();
  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });
  const [isMobile, setIsMobile] = useState(false);
  const [layoutAlert, setLayoutAlert] = useState(false);
  const [chatemail, setChatemail] = useState(false);
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  // useEffect(() => {
  //   window.addEventListener('resize', setDimension);
  //   if((screenSize.dynamicWidth> screenSize.dynamicHeight) && (isMobile == true)){
  //       console.log("I am in the if condition")
  //       alert("Please go back to portrait mode for better experience")
  //   }
  //   console.log("I am in out of the if condition")
  //   // else{
  //   //     continue;
  //   // }
  //   return(() => {
  //       window.removeEventListener('resize', setDimension);
  //   })
  // }, [screenSize])

  const getllmResponse = (result) => {
    setIsTyping(true);
    console.log(
      "I am in the getllmResponse function, ",
      `${import.meta.env.VITE_BACKEND_URL}/video/llm?q=${result}`
    );

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/video/llm?q=${result}`)
      .then((res) => {
        setTimeout(() => {
          videoRef.current.load();
          setVideoId(res.data.id);
          if (res.data.id != 2804) {
            setFetched(res.data.chat_res);
          }
          console.log("res.data : ", res.data);
          // videoRef.current.load()
          setFallback(res.data.chat_res);
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: res.data.msgId,
              text: res.data.chat_res,
              sender: "other",
            },
          ]);
          setIsTyping(false);
        }, 3000);
      });
  };

  const handleSearch = (result) => {
    setFallback(null);
    setFetched(null);
    console.log(result);
    setIsTyping(true);
    // if(result === 'intro')  {
    //   setVideoId('/Intro.mp4')
    //   setFetched(null)
    //   videoRef.current.load()
    //   handlePlayPause()
    //   return
    // }
    // setVideoId(null)
    // videoRef.current.load()
    // setInfo(null)
    // setFetched('testing')
    // return
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/video/find?q=${result}`)
      .then((res) => {
        if (
          res.data.intent === "playIntent" ||
          res.data.intent === "pauseIntent"
        ) {
          handlePlayPause();
        }
        if (res.data.intent === "nextIntent") {
          handleNext();
        }
        if (res.data.intent === "prevIntent") {
          handlePrevious();
        }
        console.log(res.data.id, res.data.msgId);
        if (res.data.id != 2803) {
          if(res.data.id == 2806){
            setAppointment(true)
          }
          if(res.data.id == 2807){
            setChatemail(true)
          }
          setVideoId(res.data.id);
          // videoRef.current = 0
          setFetched(null);
          // handlePlayPause()
          videoRef.current.load();
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              // id: prevMessages.length + 2,
              id: res.data.msgId,
              text: res.data.chat_res,
              sender: "other",
            },
          ]);
          setIsTyping(false);
          // videoId = res.data.id
        } 
        
        else {
          setVideoId((prev) => 2803);
          videoRef.current.load();
          // setFallback()
          setFetched(null);
          console.log("Hello World", result);
          res.data.llm = res.data.chat_res;
          console.log(res.data.llm, res.data.id);
          // setFallback(res.data.llm)
          setIsTyping(true);
          getllmResponse(result);
        }
      });
    setIsMicEnabled(false);
  };

  useEffect(() => {
    videoRef.current?.load();
    if (videoId !== null) {
      videoRef.current?.load();
      if (!first) {
        handlePlayPause();
      }
      console.log("Video Id : ", videoId);
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/video?id=${videoId}`)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          // console.log(err);
          if (
            err.response &&
            err.response.data !== "Requires Range Header and ID"
          )
            setError(err.response.data);
          if (err.message === "Network Error") setError(err.message);
        });
    }
  }, [videoId]);

  function createCookie(name, value, hours) {
    if (hours) {
      var date = new Date();
      date.setTime(date.getTime() + hours * 60 * 60 * 1000);
      var expiresAt = date;
      console.log(expiresAt);
    } else {
      var expiresAt = 0;
    }

    cookie.set(name, value, { expires: expiresAt, path: "/" });
  }
  const showLayoutPopup = () => {
    setLayoutAlert(true);
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/video/findsession`)
      .then((res) => {
        setVideoId(res.data.id);
        setIsMobile(res.data.device)
        if ((screenSize.dynamicWidth > screenSize.dynamicHeight) && res.data.device && (isMobile == true) && !cookie.get("layoutAlert")) {
          showLayoutPopup();
        }
        videoRef.current?.load();
        // videoRef.current?.pause()
        // if(res.data.uid)    setUid(res.data.uid)
        if (res.data.data) setQuery(res.data.data);
        // console.log(uid, query, typeof(uid), typeof(query));
        console.log(videoId, res.data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

    useEffect(() => {
    window.addEventListener('resize', setDimension);
    console.log("Layout Alert", !cookie.get("layoutAlert"))
    if ((screenSize.dynamicWidth > screenSize.dynamicHeight) && (isMobile==true) && !cookie.get("layoutAlert") ) {
        showLayoutPopup()
    }
    return(() => {
        window.removeEventListener('resize', setDimension);
    })
  }, [screenSize])



  const handlePlayPause = (e) => {
    if (e) e.stopPropagation();
    console.log(isMicEnabled);
    setIsPlaying(!isPlaying);
    if (first) setFirst(false);
    if (videoRef.current.paused && !videoRef.current.readyState) {
      // If not ready, set an event listener to start playback once it's ready
      videoRef.current.addEventListener(
        "canplay",
        () => {
          setIsPlaying(true);
          setInfo(null);
          videoRef.current.play();
        },
        { once: true }
      );
    } else if (videoRef.current.paused) {
      setIsPlaying(true);
      setInfo(null);
      videoRef.current.play();
    } else {
      setIsPlaying(false);
      videoRef.current.pause();
      if (!isMicEnabled) {
        setInfo("Humanoid: Tap to start");
      }
    }

    // console.log(videoRef.current, videoRef.current.paused);
    setFirst(false);
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/video/next`)
      .then((res) => {
        setVideoId(res.data.id);
      })
      .catch((err) => {
        setError(err.response.data);
        // console.log(err.data);
      });
  };

  const handlePrevious = (e) => {
    if (e) e.stopPropagation();
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/video/prev`)
      .then((res) => {
        setVideoId(res.data.id);
      })
      .catch((err) => {
        setError(err.response.data);
        // console.log(err.data);
      });
  };

  const handleFullScreenChange = () => {
    setIsFullScreen(document.fullscreenElement !== null);
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  const handleFullScreen = (e) => {
    e.stopPropagation();
    const video = playerContainerRef.current;
    if (!isFullScreen) {
      // Request full-screen mode if not in full screen
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }
    } else {
      // Exit full-screen mode if already in full screen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullScreen(!isFullScreen);
  };

  const handleMicToggle = async (e) => {
    e.stopPropagation();
    if (!isMicEnabled) {
      setIsMicEnabled(true);
      // if (recognition) {
      //   recognition.start()
      //   setTimeout(() => {
      //     if (recognition.result)
      //       recognition.stop();
      //     setIsMicEnabled(false)
      //   }, 8500)
      // } else {
      const tokenObj = await getTokenOrRefresh();
      const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(
        tokenObj.authToken,
        tokenObj.region
      );
      speechConfig.speechRecognitionLanguage = "en-GB";

      const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
      recognizer.current = new speechsdk.SpeechRecognizer(
        speechConfig,
        audioConfig
      );
      console.log(recognizer);
      let displayText;
      recognizer.current.recognizeOnceAsync((result) => {
        if (result.reason === ResultReason.RecognizedSpeech) {
          var customFilter = new Filter();
          customFilter.addWords("fuckoff", "fuck off");
          displayText = customFilter.clean(result.text).replace(/\*/g, "");

          if (messages.length > 0) {
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                id: prevMessages.length + 1,
                text: displayText,
                sender: "user",
              },
            ]);
          } else {
            setMessages([{ id: 1, text: displayText, sender: "user" }]);
          }
          handleSearch(displayText);
        } else {
          displayText =
            "ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.";
        }
        console.log(displayText);
      });
      // }
      console.log("Listening Started!");
      if (isPlaying) {
        setWasPlaying(true);
        handlePlayPause();
        setInfo(null);
      }
    } else {
      // console.log(recognizer.current);
      // if (recognition) {
      //   recognition.stop();
      // } else {
      if (recognizer.current) recognizer.current.close();
      // }
      if (wasPlaying) {
        setWasPlaying(false);
        handlePlayPause();
      }
      setIsMicEnabled(false);
      console.log("Listening Stopped!");
    }
  };

  return (
    <>
      <Desktop
        isChatOpen={isChatOpen}
        setIsChatOpen={setIsChatOpen}
        isMicEnabled={isMicEnabled}
        playerContainerRef={playerContainerRef}
        videoRef={videoRef}
        videoId={videoId}
        setVideoId={setVideoId}
        isHovering={isHovering}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setHovering={setHovering}
        handlePlayPause={handlePlayPause}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        handleFullScreen={handleFullScreen}
        handleMicToggle={handleMicToggle}
        timeoutRef={timeoutRef}
        isFullScreen={isFullScreen}
        isLandscape={isLandscape}
        error={error}
        messages={messages}
        setMessages={setMessages}
        first={first}
        info={info}
        fetched={fetched}
        setFetched={setFetched}
        handleSearch={handleSearch}
        isTyping={isTyping}
        fallback={fallback}
        setFallback={setFallback}
        navRef={navRef}
        layoutAlert={layoutAlert}
        setLayoutAlert={setLayoutAlert}
        createCookie={createCookie}
        appointment={appointment}
        setAppointment={setAppointment}
        chatemail={chatemail}
        setChatemail={setChatemail}
      />
    </>
  );
}

export default Player;
