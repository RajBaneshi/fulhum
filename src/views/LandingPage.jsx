import React, { useState, useRef } from 'react'
import Slider from '../components/slider/slider'
import { Link } from 'react-router-dom';
import { Box, Heading } from '@chakra-ui/react';
import './LandingPage.css';
import { Img } from '@chakra-ui/react';
import Fallback from '../assets/fallback.png'
import TypewriterComponent from "typewriter-effect";
import AccordionSection from '../components/accordion/Accordion';
import CarouselSection from '../components/carousel/carousel';


const LandingPageTop = ({ isLandscape }) => {
    const [muted, setMuted] = useState(true);
    const videoRef = useRef(null);

    const unMute = () => {
        console.log("Hello");
        videoRef.current.play();
        setMuted(false);
    }


    return (

        // <div className='demo_wrap'>
        //     <img  className='bg_img' 
        //     // src="url('https://d3rsva8zdn1qpf.cloudfront.net/sites/school82/files/styles/ins_banner/public/2022-11/fulham-homepage-banner-2.jpg.jpeg?itok=2k1_rAO8')"/>
        //     src={Background}/>
        <div>

            <div
                className="flex-container bg-cover w-full justify-center"
                style={{
                    backgroundPosition: "center",
                    backgroundImage: "url('https://d3rsva8zdn1qpf.cloudfront.net/sites/school82/files/styles/ins_banner/public/2022-11/fulham-homepage-banner-2.jpg.jpeg?itok=2k1_rAO8')",
                }}
            >
                <div
                    className="bg-cover w-full h-full justify-around"
                    style={{
                        backgroundColor: 'rgba(0, 0, 0)',
                        opacity: "0.5"
                    }}
                >

                    <div className='top_container_div  slider_div '>
                        {/* <div className="slider_inner_div">
                        <Slider />
                    </div> */}
                    </div>

                    <div className='top_container_div   video_div ' >
                        {/* <div className='slider_inner_div'>
                        <Heading as={Link} to="/player" display={'flex'} justifyContent={'center'} alignItems={'center'}>
                            <video
                                ref={videoRef}
                                src={'./Intro.mp4'}
                                style={{
                                    borderRadius: "0.5rem",
                                    zIndex: "10"
                                }}
                                muted={muted}
                                controls
                                loop
                                width='100%'
                            // width={isLandscape ? '50%' : '100%'} 
                            />
                        </Heading>
                    </div> */}
                    </div>
                </div>
            </div>

            <Box display={'flex'} flexDir={['column', 'row']} justifyContent={'space-around'}
                // style={{ backgroundColor: '#122147' }}
                className='py-10'>
                {/* Conversation Section */}
                <Box className='px-5' width={'100%'} alignItems={'center'}>
                    <Box textAlign="center" className='flex flex-col w-full py-16 justify-center items-start sm:px-8' width={'100%'}
                    // p={isLandscape ? 28 : 14}
                    >
                     
                        <a className='heading text-left text-blue-900'>Do you have a question ? <br/>Just ask</a>
                        <hr style={{ background: '#f5be01', width: "100%" }} className='text-center h-px my-4' />
                        <p className='content text-left text-xl' 
                        >I'm your personal Al school assistant. Ask me about our school, admissions, curriculum, school life and more. <br/>Click the Microphone to ask a question. Use Play to repeat responses or click Microphone to ask a new question.</p>
                        {/* <div className="flex flex-col py-5 my-2 gap-2 px-3 max-w-lg justify-center items-center">
                            <button
                                style={{ backgroundColor: '#f5be01', borderRadius: "50em" }}
                                className="button flex flex-row  justify-center px-5 py-3 hover:bg-gray-700 hover:text-white 
                                    hover:bg-red-700 text-black relative block focus:outline-none focus:bg-red-200 text-sm text-center uppercase tracking-widest mx-3 px-10">
                                <Link to="/player">
                                    Let have a Conversation!
                                </Link>
                            </button>
                        </div> */}
                    </Box>
                </Box>

                {/* Play Dummy Section */}
                <Box className='flex w-full justify-center align-center px-4'>
                    <div className='flex flex-col w-full justify-center align-center h-full'>
                        {/* <div className='  ' > */}
                        <CarouselSection />
                        {/* </div>    */}
                        {/* <Img as="img" src={Fallback} alt="Player"
                                // width='100%'
                                width={isLandscape ? '75%' : '100%'}
                            /> */}

                    </div>
                </Box>
            </Box>

            {/* TYPEWRITER EFFECT */}
            {/* 
            <div className="text-white py-5 text-center space-y-5 ">
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 ">
                    <div className="text-transparent bg-clip-text bg-blue-600 drop-shadow-2xl ">
                        <TypewriterComponent
                            className='heading'
                            options={{
                                strings: [
                                    "Ella, Next Gen AI For School"
                                ],
                                
                                autoStart: true,
                                loop: true,
                            }}
                        />
                    </div>
                </div>
            </div> */}

            <div className="flex flex-col justify-center items center py-5 my-5 gap-2 px-3" style={{ backgroundColor: '#122147' }}>
                <p className='heading text-white text-center'>Contact Us Today!</p>
                <div className="flex justify-center py-2 gap-2 px-3">
                    <hr style={{ background: '#f5be01', width: "60%" }} className='text-center h-px bg-gray-200 border-0 dark:bg-gray-700' />
                </div>
                <div className="flex justify-center py-2 gap-2 px-3">
                    <p className='text-white text-base font-sans text-center'>Learn more about how we help children build a lasting foundation for long term acheivement.</p>
                </div>
                <div className="flex justify-center py-5 px-3">
                    {/* 
                    {muted && <button
                        style={{ backgroundColor: '#f5be01', borderRadius: "50em" }}
                        className="button flex flex-row px-5 py-3 hover:bg-gray-700 hover:text-white 
                         hover:bg-red-700 text-black relative block focus:outline-none focus:bg-red-200 text-sm text-center uppercase tracking-widest mx-3 px-10"
                        onClick={unMute}>
                        Tap to Play Intro!
                    </button>
                    } */}
                    <button
                        style={{ backgroundColor: '#f5be01', borderRadius: "50em" }}
                        className="button flex flex-row px-5 py-3 hover:bg-gray-700 hover:text-white 
                            hover:bg-red-700 text-black relative block focus:outline-none focus:bg-red-200 text-sm text-center uppercase tracking-widest mx-3 px-10">
                        Enquire Now
                    </button>
                </div>
            </div>
            {/* AccordionSection  */}
            {/* <AccordionSection /> */}
        </div>
    )
}

export default LandingPageTop


