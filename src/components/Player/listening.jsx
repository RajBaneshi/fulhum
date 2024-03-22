import { Box, chakra, shouldForwardProp } from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion';

const ChakraBox = chakra(motion.div, {
    /**
     * Allow motion props and non-Chakra props to be forwarded.
     */
    shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
});

function Listening({ isLandscape }) {
    return (
        <Box
            w={isLandscape ? "12%" : "18%"}
            display={'flex'}
            zIndex={5}
            justifyContent={'space-evenly'}
            mt={isLandscape ? "6%" : "15%"}
            mr={isLandscape ? "unset" : "3%"}
        >
            <Box>
                <ChakraBox
                    animate={{
                        borderRadius: ['100%', '25%', '15%', '15%', '15%', '25%', '100%'],
                        height: ['5px', '25px', '45px', '65px', '85px', '65px', '45px', '25px', '5px'],
                        marginTop: ['-10px', '-15px', '-25px', '-35px', '-45px', '-35px', '-25px', '-15px', '-10px'],
                        marginBottom: ['-10px', '-15px', '-25px', '-35px', '-45px', '-35px', '-25px', '-15px', '-10px']
                    }}
                    // @ts-ignore no problem in operation, although type error appears.
                    transition={{
                        duration: 1.65,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "loop",
                    }}
                    padding="1"
                    bgColor={'#1a428a'}
                    // bgGradient="linear(to-l, #7928CA, #FF0080)"
                    display="flex"
                    alignItems={'center'}
                    justifyContent={'center'}
                    position={'absolute'}
                    width="1px"
                // height="100px"
                />
            </Box>
            <Box>
                <ChakraBox
                    animate={{
                        borderRadius: ['25%', '15%', '15%', '15%', '25%', '100%', '25%'],
                        height: ['25px', '45px', '65px', '85px', '65px', '45px', '25px', '5px', '25px'],
                        marginTop: ['-15px', '-25px', '-35px', '-45px', '-35px', '-25px', '-15px', '-10px', '-15px'],
                        marginBottom: ['-15px', '-25px', '-35px', '-45px', '-35px', '-25px', '-15px', '-10px', '-15px']
                    }}
                    // @ts-ignore no problem in operation, although type error appears.
                    transition={{
                        duration: 1.65,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "loop",
                    }}
                    padding="1"
                    bgColor={'#f7be00'}
                    // bgGradient="linear(to-l, #7928CA, #FF0080)"
                    display="flex"
                    alignItems={'center'}
                    justifyContent={'center'}
                    position={'absolute'}
                    width="1px"
                // height="100px"
                />
            </Box>
            <Box>
                <ChakraBox
                    animate={{
                        borderRadius: ['15%', '15%', '15%', '25%', '100%', '25%', '15%'],
                        height: ['45px', '65px', '85px', '65px', '45px', '25px', '5px', '25px', '45px'],
                        marginTop: ['-25px', '-35px', '-45px', '-35px', '-25px', '-15px', '-10px', '-15px', '-25px'],
                        marginBottom: ['-25px', '-35px', '-45px', '-35px', '-25px', '-15px', '-10px', '-15px', '-25px']
                    }}
                    // @ts-ignore no problem in operation, although type error appears.
                    transition={{
                        duration: 1.65,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "loop",
                    }}
                    padding="1"
                    bgColor={'#1a428a'}
                    // bgGradient="linear(to-l, #7928CA, #FF0080)"
                    display="flex"
                    alignItems={'center'}
                    justifyContent={'center'}
                    position={'absolute'}
                    width="1px"
                // height="100px"
                />
            </Box>
            <Box>
                <ChakraBox
                    animate={{
                        borderRadius: ['15%', '15%', '15%', '25%', '100%', '25%', '15%', '15%', '15%'],
                        height: ['65px', '85px', '65px', '45px', '25px', '5px', '25px', '45px', '65px'],
                        marginTop: ['-35px', '-45px', '-35px', '-25px', '-15px', '-10px', '-15px', '-25px', '-35px'],
                        marginBottom: ['-35px', '-45px', '-35px', '-25px', '-15px', '-10px', '-15px', '-25px', '-35px']
                    }}
                    // @ts-ignore no problem in operation, although type error appears.
                    transition={{
                        duration: 1.65,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "loop",
                    }}
                    padding="1"
                    bgColor={'#f7be00'}
                    // bgGradient="linear(to-l, #7928CA, #FF0080)"
                    display="flex"
                    alignItems={'center'}
                    justifyContent={'center'}
                    position={'absolute'}
                // width="1px"
                // height="100px"
                />
            </Box>
        </Box>
    )
}

export default Listening;
