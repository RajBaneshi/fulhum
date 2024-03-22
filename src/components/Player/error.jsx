import { Box, IconButton, Text } from "@chakra-ui/react";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Error({ error, isPlaying }) {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      position={"absolute"}
      width={"100%"}
      height={"100%"}
      // zIndex={5}
   
    >
      <div className=" border-2 px-4 py-1 bg-blue-500 rounded-xl hover:bg-blue-700  hover:border-gray-500 ">
        <div>
          <FontAwesomeIcon icon={!isPlaying ? faPlay: faPause} color="white" />
        </div>
      </div>
    </Box>
  );
}

export default Error;
