import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Mobile from '../../components/Player/playerMobile';
import Desktop from '../../components/Player/playerDesktop';
import { getTokenOrRefresh } from '../../util/token_util';
import { ResultReason } from 'microsoft-cognitiveservices-speech-sdk';

import { logger } from '../../util/logging';

const speechsdk = require('microsoft-cognitiveservices-speech-sdk')


function Player({ isLandscape }) {
  axios.defaults.withCredentials = true
  const [first, setFirst] = useState(true)
  const [query, setQuery] = useState([])
  const [isHovering, setHovering] = useState(false);
  const [isMicEnabled, setIsMicEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wasPlaying, setWasPlaying] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const timeoutRef = useRef(null);
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const videoRef = useRef(null);
  const playerContainerRef = useRef(null);
  const recognizer = useRef(null)
  let recognition = null;


  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadeddata', () => {
        logger.log(videoRef)
        if (!first && videoRef.current.paused) handlePlayPause()
        //videoRef.current.play();
      });
    }
    if (videoId !== null) {
      videoRef.current?.load();
      logger.log(isPlaying, wasPlaying);
      if (wasPlaying) handlePlayPause();
      if (first) setFirst(false)
      logger.log(videoId);
    }
  }, [videoId]);


  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/video/findsession`, { withCredentials: true })
      .then((res) => {
        setVideoId(res.data.id)
        // videoId = res.data.id
        videoRef.current?.load();
        // videoRef.current?.pause()
        // if(res.data.uid)    setUid(res.data.uid)
        if (res.data.data) setQuery(res.data.data)
        // logger.log(uid, query, typeof(uid), typeof(query));
        logger.log(videoId, res.data.id)
      }).catch((err) => {
        logger.log(err);
      })
  }, []);

  const handlePlayPause = () => {
    if (!isPlaying) videoRef.current.play()
    else videoRef.current.pause()
    setIsPlaying(!isPlaying);
  };

  const handleNext = (e) => {
    if (e) e.preventDefault()
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/video/next`, { withCredentials: true }).then((res) => {
      setVideoId(res.data.id)
    }).catch((err) => {
      logger.log(err.data);
    })
  }

  const handlePrevious = (e) => {
    if (e) e.preventDefault()
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/video/prev`, { withCredentials: true }).then((res) => {
      setVideoId(res.data.id)
    }).catch((err) => {
      logger.log(err.data);
    })
  }

  const handleFullScreenChange = () => {
    setIsFullScreen(document.fullscreenElement !== null);
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
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
    e.stopPropagation()
    logger.log("Clicked!")
    if (!isMicEnabled) {
      setIsMicEnabled(true)
      if (recognition) {
        recognition.start()
        setTimeout(() => {
          if (recognition.result)
            recognition.stop();
          setIsMicEnabled(false)
        }, 8500)
      } else {
        const tokenObj = await getTokenOrRefresh();
        const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
        speechConfig.speechRecognitionLanguage = 'en-IN';

        const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
        recognizer.current = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);
        logger.log(recognizer);
        let displayText;
        recognizer.current.recognizeOnceAsync(result => {

          if (result.reason === ResultReason.RecognizedSpeech) {
            displayText = `${result.text}`
          } else {
            displayText = 'ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.';
          }
          logger.log(displayText);
          if (messages.length > 0) {
            setMessages((prevMessages) => [
              ...prevMessages,
              { id: prevMessages.length + 1, text: displayText, sender: 'user' },
            ]);
          } else {
            setMessages([{ id: 1, text: displayText, sender: 'user' }])
          }

          axios.get(`${import.meta.env.VITE_BACKEND_URL}/video/find?q=${displayText}&client=chatbot`, { withCredentials: true }).then((res) => {
            if (res.data.intent === 'playIntent' || res.data.intent === 'pauseIntent') {
              handlePlayPause()
            }
            if (res.data.intent === 'nextIntent') {
              handleNext()
            }
            if (res.data.intent === 'prevIntent') {
              handlePrevious()
            }
            if (res.data.data) setQuery(res.data.data)
            logger.log(res.data.id, res.data.uid, res.data.data);
            if (res.data.id) {
              setVideoId(res.data.id)
              // videoId = res.data.id
            }
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                id: prevMessages.length + 2,
                text: res.data.chat_res,
                sender: "other",
              },
            ]);
          })

          setIsMicEnabled(false)
        });
      }
      logger.log('Listening Started!')
      if (isPlaying) {
        setWasPlaying(true)
        handlePlayPause()
      }
    } else {
      logger.log(recognizer.current);
      if (recognition) {
        recognition.stop();
      } else {
        recognizer.current.close()
      }
      if (wasPlaying) {
        setWasPlaying(false)
        handlePlayPause()
      }
      setIsMicEnabled(false)
      logger.log('Listening Stopped!');
    }
  };

  return (
    <>
      {/* Phone Layout (Portrait) */}
      {!isLandscape ? (
        <Mobile
          playerContainerRef={playerContainerRef}
          videoRef={videoRef} videoId={videoId}
          isHovering={isHovering}
          setHovering={setHovering}
          isPlaying={isPlaying}
          isMicEnabled={isMicEnabled}
          isChatOpen={isChatOpen}
          handleFullScreen={handleFullScreen}
          setVideoId={setVideoId}
          handleMicToggle={handleMicToggle}
          timeoutRef={timeoutRef}
          setShowControls={setShowControls}
          handlePrevious={handlePrevious}
          handlePlayPause={handlePlayPause}
          handleNext={handleNext}
          setIsChatOpen={setIsChatOpen}
          isLandscape={isLandscape}
          messages={messages}
          setMessages={setMessages}
        />
      ) : (
        <Desktop
          isChatOpen={isChatOpen}
          setIsChatOpen={setIsChatOpen}
          isMicEnabled={isMicEnabled}
          playerContainerRef={playerContainerRef}
          videoRef={videoRef}
          videoId={videoId}
          setVideoId={setVideoId}
          showControls={showControls}
          setShowControls={setShowControls}
          isPlaying={isPlaying}
          handlePlayPause={handlePlayPause}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          handleFullScreen={handleFullScreen}
          handleMicToggle={handleMicToggle}
          timeoutRef={timeoutRef}
          isFullScreen={isFullScreen}
          isLandscape={isLandscape}
          messages={messages}
          setMessages={setMessages}
        />
      )}
    </>
  );
};

export default Player;
