import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Heading, Img } from '@chakra-ui/react';
import Fallback from '../assets/fallback.png';
import { logger } from '../util/logging';
import FaqSection from '../components/faqs/faq';
import LandingPageTop from '../views/LandingPage';
import { useLocation } from 'react-router-dom';
import Footer from '../components/footer/footer'; 


function LandingPage({ isLandscape }) {
    const location = useLocation();
    const [count, setCount] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show')
                } else {
                    entry.target.classList.remove('show');
                }
            })
        })

        const hiddenElements = document.querySelectorAll('.hidden');
        hiddenElements.forEach((elem) => observer.observe(elem));

        // execute on location change
        console.log("HELLO")
        // window.location.reload();
        setCount(count + 1);
        console.log('Location changed!', location.pathname);
    }, [location]);

    return (
        <>
            <Box
                height={"100%"}
                pb={'6vh'}
            >

                <LandingPageTop isLandscape={isLandscape} />

                
                {/* Banner */}
                {/* <Box
                    backgroundImage="url('https://d3rsva8zdn1qpf.cloudfront.net/sites/school82/files/styles/ins_banner/public/2022-11/fulham-homepage-banner-2.jpg.jpeg?itok=2k1_rAO8')"
                    width={"100%"}
                    backgroundSize="cover"
                    backgroundPosition="center"
                    backgroundRepeat={'no-repeat'}
                    height={'100%'}
                    bgPosition={'62%'}
                /> */}
                {/* You can add any content on top of the banner image if needed */}
                {/* </Box> */}

                {/* <FaqSection /> */}
                <Footer />
            </Box>
        </>
    );
};

export default LandingPage;