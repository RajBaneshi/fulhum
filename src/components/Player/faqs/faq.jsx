import React from 'react'
import './faq.css'
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from "@chakra-ui/react";

const FaqSection = () => {


    const faqs = [
        { question: "SAMPLE question" },
        { question: "SAMPLE question" },
        { question: "SAMPLE question" },
        { question: "SAMPLE question" },
        { question: "SAMPLE question" },
        { question: "SAMPLE question" },
        { question: "SAMPLE question" },
        { question: "SAMPLE question" },
        { question: "SAMPLE question" }
    ]

    const handleHover = (e) => {
        console.log(e);
    }
    return (
        <>

            <div className='wrapper '>

                <div className='carousel hidden'>
                    <h1>FAQS:</h1>
                    {/* <Accordion> */}
                    <>
                        {
                            faqs.map((faq, index) => {
                                let animationDelay = 3 * (index - 1);
                                if (index == faqs.length - 1) {
                                    animationDelay = (3) * -2;
                                }
                                return (
                                        <div

                                            key={index}
                                            className='carousel__item '
                                            style={{
                                                animationDelay: `${animationDelay}s`,
                                                //   animation: `carousel-animate-vertical ${faqs.length* 3}s linear infinite`
                                            }}>
                                            <div className='carousel__item-head'>
                                                {index}
                                            </div>
                                            <div className='carousel__item-body faq' onFocus={handleHover}>
                                                <p className='title faq-question'>{faq.question}</p>
                                                <p>Unicode: U+1F433</p>
                                             
                                             
                                                    <div className="faq-answer">
                                                        This is the answer to the FAQ. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                                    </div>
                                        
                                            </div>
                                        </div>
                                )
                            })


                        }
                    </>
                    {/* </Accordion> */}
                </div>
            </div>

        </>
    )
}

export default FaqSection;