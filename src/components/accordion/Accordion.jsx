import React, { useEffect } from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
} from '@chakra-ui/react';
import { Fade, ScaleFade, Slide, SlideFade, Collapse } from '@chakra-ui/react'

import './accordion.css';

const data =  [
    {
        imgSource: "/faq0.png",
        question:  "How to Interact with Voice",
    },
    {
        imgSource: "/faq1.png",
        question:  "How to Interact with Voice",
    },
    {
        imgSource: "/faq2.png",
        question:  "Text Mode Views",
    },
    {
        imgSource: "/faq3.png",
        question:  "How to interact with Text",
    },
    {
        imgSource: "/faq4.png",
        question:  "When is the humanoid in Listening mode",
    },
    {
        imgSource: "/faq5.png",
        question:  "Pause Mode",
    },
    {
        imgSource: "/faq6.png",
        question:  "Full Screen View",
    },
    {
        imgSource: "/faq7.png",
        question:  "How to access the Humanoid",
    },
   
]

const AccordionSection = () => {

    return (
        <div className= 'px-10 mx-5'>
               <h1 className="heading">
                    Frequently Asked Questions!
                </h1>
        <Accordion allowToggle >
        {
            data.map((faq, index) => {
                return (
                    <div key={index}>
                    <AccordionItem 
                    borderBlockEndColor={'#f5be01'}
                    borderBlockStartColor={'#f5be01'}
                    className='my-2  py 2' 
                    key={index}>
                        <h2>
                            <AccordionButton
                            _expanded={{ bg: '#1a428a', color: 'white' }}>
                                <Box className='q_text' as="span" flex='1' textAlign='left'>{faq.question}</Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <>
                                <div className='flex flex-col'>
                                    {/* <p className='py-3'>{faq.answer}</p> */}
                                    {faq.imgSource && <img style={{ backgroundColor: "white" }}
                                        className="h-auto max-w-lg rounded-lg"
                                        src={faq.imgSource}
                                        alt="image description" />
                                    }
                                </div>
                            </>
                        </AccordionPanel>
                    </AccordionItem>
                    </div>
                );
            })
        }
        </Accordion>
        </div>
    )
};    
export default AccordionSection; 